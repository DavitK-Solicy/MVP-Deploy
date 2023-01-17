import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as googleAuth from 'google-auth-library';
import { AuthProviders, User, UserRoles } from '../../models/User';
import { MailOptions, sendEmail } from '../../util/email/email.util.nodemailer';
import env from '../../util/constants/env';

const googleClient = new googleAuth.OAuth2Client(env.clientId);

const SECRET_JWT_CODE = env.secretJwtCode;

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const usersCount = await User.collection.countDocuments();
    const users = await User.find().skip(offset).limit(limit);

    return res.send({ data: users, count: usersCount });
  } catch (err) {
    res.status(404);
    res.send({ success: false, error: err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, role, bankAccount } = req.body;

    const isUserExist = await User.findOne({
      email,
    });

    if (isUserExist) {
      return res.json({ success: false, message: `${email} already exist` });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
      bankAccount,
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
  const { fullName, email, password, referralCode } = req.body;

  if (!email || !password || !fullName) {
    return res.json({
      success: false,
      error: 'Submit all required parameters',
    });
  }

  try {
    const registeredUser = await User.findOne({ email }).select('+password');
    if (registeredUser) {
      return res.json({ success: false, error: 'You already have an account' });
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id, email }, SECRET_JWT_CODE);

    const mailOptions: MailOptions = {
      to: email,
      subject: 'You have successfully registered',
      text: 'Welcome to CryptoPool',
    };

    await sendEmail(mailOptions);
    return res.json({ success: true, token, user });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      error: 'Submit all required parameters',
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.json({
        success: false,
        error: `Account with ${email} doesn't exist`,
      });
    }

    if (password !== user.password) {
      return res.json({ success: false, error: 'Wrong password' });
    }

    user.password = undefined;
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_JWT_CODE
    );

    return res.json({ success: true, token, user });
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

export const loginForAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      error: 'Submit all required parameters',
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.json({
        success: false,
        error: `Account with ${email} doesn't exist`,
      });
    }

    if (user.role !== UserRoles.ADMIN) {
      return res.json({
        success: false,
        error: `Only admin can log in to the Admin dashboard`,
      });
    }

    if (password !== user.password) {
      return res.json({ success: false, error: 'Wrong password' });
    }

    user.password = undefined;
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_JWT_CODE
    );

    return res.json({ success: true, token, user });
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

export const changePassword = async (req: Request, res: Response) => {
  try {
    const currentUser = req['user'];
    const { oldPassword, newPassword } = req.body;

    const dbUser = await User.findById(currentUser.id).select('+password');

    if (oldPassword !== dbUser.password) {
      return res.json({ success: false, error: 'Wrong password' });
    }

    dbUser.password = newPassword;
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
    const { fullName, email, role, bankAccount } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.json({ success: false, error: 'User does not exist!' });
    }

    user.role = role;
    user.email = email;
    user.fullName = fullName;
    user.bankAccount = bankAccount;

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

    const code = Math.floor(1000 + Math.random() * 9000);
    user.emailVerificationCode = code;

    const mailOptions: MailOptions = {
      to: email,
      subject: 'Recover Password',
      html: `<div>
              <div>Change your password</div>
              <div>Your code - ${code}</div>
             </div>`,
    };

    await sendEmail(mailOptions);

    await user.save();

    return res.send({
      success: true,
      message: `It was successfully sent to ${email}`,
    });
  } catch (err) {
    res.json({
      success: false,
      error: 'Something went wrong, please try again',
    });
  }
};

export const checkVerificationCode = async (req: Request, res: Response) => {
  try {
    const { emailVerificationCode, email } = req.body;
    const user = await User.findOne({
      email,
    });

    if (user.emailVerificationCode === emailVerificationCode) {
      return res.json({ success: true, user });
    } else {
      return res.json({
        success: false,
        message: 'Entered code is not correct, please try again',
      });
    }
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const updateForgottenPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, email } = req.body;

    if (!newPassword || !email) {
      return res.send({
        success: false,
        error: 'Send all necessary parameters',
      });
    }

    const user = await User.findOne({
      email,
    }).select('+password');

    if (!user) {
      return res.send({
        success: false,
        error: 'Wrong token',
      });
    }

    user.password = newPassword;
    user.emailVerificationCode = null;

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
