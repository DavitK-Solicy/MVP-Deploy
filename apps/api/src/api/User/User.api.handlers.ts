import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as googleAuth from 'google-auth-library';
import { AuthProviders, User } from '../../models/User';
import { MailOptions, sendEmail } from '../../util/email/email.util.nodemailer';
import env from '../../util/constants/env';
import {
  getOAuthAccessToken,
  getOAuthRequestToken,
  getProtectedResource,
} from '../lib/oauth-promise';

const googleClient = new googleAuth.OAuth2Client(env.clientId);

const SECRET_JWT_CODE = env.secretJwtCode;

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const usersCount = await User.collection.countDocuments();
    const users = await User.find().skip(offset).limit(limit);

    return res.send({ users, count: usersCount });
  } catch (err) {
    res.status(404);
    res.send({ success: false, error: err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const isUserExist = await User.findOne({
      email,
    });

    if (isUserExist) {
      return res.json({ success: false, message: `${email} already exist` });
    }

    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
      role,
    });

    return res.json({
      success: true,
      message: `${email} successfully created`,
      data: user,
    });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req['user'];

    if (!user) {
      return res.json({ success: false, error: 'User does not exist!' });
    }

    return res.send({ success: true, data: user });
  } catch (err) {
    res.send({ success: false, error: err });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req['user'];

    user.email = req.body.email;

    await user.save();
    return res.send(user);
  } catch (err) {
    res.status(404);
    res.send({ success: false, error: err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.deleteOne({ _id: id });

    return res.send({ success: true });
  } catch (err) {
    res.status(404);
    res.send({ success: false, error: err });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const user = req['user'];

    if (!user) {
      res.send({ success: false, message: 'Invalid Token' });
    }

    req['user'] = null;

    return res.json({ success: true, message: 'user logout successfully' });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, referralCode } = req.body;

  if (!email || !password) {
    return res.json({ success: false, error: 'Send needed params' });
  }

  try {
    const registeredUser = await User.findOne({ email }).select('+password');
    if (registeredUser) {
      return res.json({ success: false, error: 'You already have an account' });
    }

    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const token = jwt.sign({ id: user._id, email: email }, SECRET_JWT_CODE);

    // const mailOptions: MailOptions = {
    //   to: email,
    //   subject: 'You have successfully registered',
    //   text: 'Welcome to CryptoPool',
    // };

    // await sendEmail(mailOptions);
    return res.json({ success: true, token, user });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, error: 'Send needed params' });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.json({
        success: false,
        error: `Account with ${email} doesn't exist`,
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.json({ success: false, error: 'Wrong password' });
    }

    user.password = undefined;
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_JWT_CODE
    );

    return res.json({ success: true, userData: { token, user } });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

export const signupByGoogle = async (req: Request, res: Response) => {
  try {
    const { googleToken } = req.body;

    if (!googleToken) {
      return res.send({
        success: false,
        error: 'Token is empty',
      });
    }

    const googleResponse = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: env.clientId,
    });

    const { name, email, picture } = googleResponse.getPayload();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send({
        success: false,
        error: `${email} has already been registered`,
      });
    }

    const newUser = await User.create({
      email,
      authProvider: AuthProviders.GOOGLE,
    });

    const token = jwt.sign({ id: newUser._id, email }, SECRET_JWT_CODE);

    return res.json({ success: true, token, user: newUser });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

export const loginByGoogle = async (req: Request, res: Response) => {
  try {
    const { googleToken } = req.body;

    if (!googleToken) {
      return res.send({
        success: false,
        error: 'Token is empty',
      });
    }

    const googleResponse = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: env.clientId,
    });

    const { email } = googleResponse.getPayload();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id, email }, SECRET_JWT_CODE);

      return res.send({
        email,
        success: true,
        existingUser,
        token,
      });
    }

    return res.send({
      success: false,
      error: `There is no account for ${email}`,
    });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

const hashPassword = (
  password: string,
  saltRounds = 10
): Promise<{
  isUpdated: boolean;
  hashedPassword: string;
}> => {
  if (!password) {
    throw new Error('No password available in the instance');
  }

  return bcrypt.hash(password, saltRounds).then((hashedPassword) => {
    return {
      isUpdated: true,
      hashedPassword,
    };
  });
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const currentUser = req['user'];
    const { oldPassword, newPassword } = req.body;

    const dbUser = await User.findById(currentUser.id).select('+password');

    const isSame = await bcrypt.compare(oldPassword, dbUser.password);

    if (!isSame) {
      return res.json({ success: false, error: 'Wrong password' });
    }

    const newHash = await hashPassword(newPassword);
    dbUser.password = newHash.hashedPassword;
    await dbUser.save();

    dbUser.password = undefined;

    const mailOptions: MailOptions = {
      to: currentUser.email,
      subject: 'You have successfully changed your password!',
      text: 'Change Password Alert',
    };

    await sendEmail(mailOptions);

    return res.send({ success: true });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, role, primaryWalletAddress } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.json({ success: false, error: 'User does not exist!' });
    }

    user.role = role;
    user.email = email;
    user.primaryWalletAddress = primaryWalletAddress;

    await user.save();
    return res.send({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

export const inviteFriends = async (req: Request, res: Response) => {
  try {
    const user = req['user'];
    const { toEmail } = req.body;

    if (!toEmail) {
      return res.json({ success: false, error: 'Send email' });
    }

    if (user.email === toEmail) {
      return res.json({
        success: false,
        error: "You can't send invitation to your email",
      });
    }

    const isExistUser = await User.findOne({
      email: toEmail,
    });

    if (isExistUser) {
      return res.send({
        success: false,
        error: `${toEmail} is already registered`,
      });
    }

    const mailOptions: MailOptions = {
      from: user.email,
      to: toEmail,
      subject: 'Please join to CryptoPool',
      html: `<div>
                <div>It will be very interesting</div>
                  <div>
                    <a href=${env.deployedFrontendUrl}/signup?referralCode=${user.referralCode} target="_blank">
                      Join to CryptoPool
                    </a>
                  </div>
               </div>`,
    };

    await sendEmail(mailOptions);

    return res.send({
      success: true,
      message: `It was successfully sent to ${toEmail}`,
    });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

export const sendRecoverPasswordEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.send({
        success: false,
        error: 'Please send email',
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.send({
        success: false,
        error: `There is no user with ${email} email`,
      });
    }

    const emailVerificationToken = jwt.sign(
      { id: user._id, email },
      SECRET_JWT_CODE
    );

    const mailOptions: MailOptions = {
      to: email,
      subject: 'Recover Password',
      html: `<div>
              <div>Visit this link to change your password</div>
              <div>
                <a href=${env.deployedFrontendUrl}/newPassword?emailVerificationToken=${emailVerificationToken} target="_blank">
                  Recover Password
                </a>
              </div>
             </div>`,
    };

    await sendEmail(mailOptions);

    user.emailVerificationToken = emailVerificationToken;
    await user.save();

    return res.send({
      success: true,
      emailVerificationToken: user.emailVerificationToken,
      message: `It was successfully sent to ${email}`,
    });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

export const twitter = async (req: Request, res: Response) => {
  const io = req.app.get('socketio');
  try {
    const {
      oauthRequestToken,
      oauthRequestTokenSecret,
    } = await getOAuthRequestToken();
    req.session.oauthRequestToken = oauthRequestToken;
    req.session.oauthRequestTokenSecret = oauthRequestTokenSecret;
    req.session.socketId = req.query.socketId;
    req.session.signUp = req.query.signUp.toString();
    const authorizationUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthRequestToken}`;
    res.redirect(authorizationUrl);
  } catch (err) {
    const response = { success: false, error: err };
    io.in(req.session.socketId).emit('user', response);
    res.end();
  }
};

export const twitterCallback = async (req: Request, res: Response) => {
  const io = req.app.get('socketio');
  let response;
  try {
    const { oauthRequestToken, oauthRequestTokenSecret } = req.session;
    const { oauth_verifier: oauthVerifier } = req.query;
    const {
      oauthAccessToken,
      oauthAccessTokenSecret,
    } = await getOAuthAccessToken({
      oauthRequestToken,
      oauthRequestTokenSecret,
      oauthVerifier,
    });
    req.session.oauthAccessToken = oauthAccessToken;
    const { data } = await getProtectedResource(
      'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
      'GET',
      oauthAccessToken,
      oauthAccessTokenSecret
    );
    const userData = JSON.parse(data);
    const userEmail = userData.email;
    const twitterId = userData.id_str;
    if (userEmail == '') {
      response = {
        success: false,
        error: 'User do not have email linked with Twitter',
      };
      io.in(req.session.socketId).emit('user', response);
      return res.end();
    }

    const twitterConnectedUser = await User.findOne({ twitterId });
    const emailRegisteredUser = await User.findOne({ email: userEmail });
    if (emailRegisteredUser == null) {
      const user = await User.create({
        email: userEmail,
        twitterId: twitterId,
        authProvider: AuthProviders.TWITTER,
      });
      const token = jwt.sign(
        { id: user._id, email: userEmail },
        SECRET_JWT_CODE
      );
      response = { success: true, token: token, userData: user };
      io.in(req.session.socketId).emit('user', response);
      return res.end();
    } else if (twitterConnectedUser == null) {
      emailRegisteredUser.twitterId = twitterId;
      await emailRegisteredUser.save();
    } else if (req.session.signUp == 'true' && twitterConnectedUser) {
      response = { success: false, error: 'user already registered' };
      io.in(req.session.socketId).emit('user', response);
    }
    const token = jwt.sign(
      {
        id: emailRegisteredUser._id,
        email: emailRegisteredUser.email,
        role: emailRegisteredUser.role,
      },
      SECRET_JWT_CODE
    );
    response = { success: true, token: token, userData: emailRegisteredUser };
    io.in(req.session.socketId).emit('user', response);
    return res.end();
  } catch (err) {
    response = { success: false, error: err.message };
    io.in(req.session.socketId).emit('user', response);
    return res.end();
  }
};

export const updateForgottenPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, emailVerificationToken } = req.body;

    if (!newPassword || !emailVerificationToken) {
      return res.send({
        success: false,
        error: 'Send password and emailVerificationToken',
      });
    }

    const user = await User.findOne({
      emailVerificationToken,
    }).select('+password');

    if (!user) {
      return res.send({
        success: false,
        error: 'Wrong token',
      });
    }

    const newHash = await hashPassword(newPassword);
    user.password = newHash.hashedPassword;

    await user.save();
    user.password = undefined;

    return res.send({
      success: true,
      message: 'Password successfully updated',
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const updateWallet = async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.body;
    const user = req['user'];
    const isWalletExist = user.walletAddresses.includes(walletAddress);
    if (!isWalletExist) {
      if (!user.primaryWalletAddress) {
        user.primaryWalletAddress = walletAddress;
      }
      await user.walletAddresses.push(walletAddress);
      await user.save();
    }

    return res.send(user);
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

export const getUserWallet = async (req: Request, res: Response) => {
  try {
    const user = req['user'];

    return res.json({
      success: true,
      walletAddresses: user.walletAddresses,
    });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};
