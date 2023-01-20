import { Request, Response } from 'express';
import { Invoice } from '../../models/Invoice';
import { MailOptions, sendEmail } from '../../util/email/email.util.nodemailer';

export const sendInvoice = async (req: Request, res: Response) => {
  try {
    const { emailId } = req.body;
    const user = req['user'];

    if (user.email === emailId) {
      return res.json({
        success: false,
        message: 'You can not send yourself an email!',
      });
    }

    const data = (await Invoice.create({
      ...req.body,
      sender: user.id,
    })) as any;

    if (data) {
      const mailOptions: MailOptions = {
        from: user.email,
        to: emailId,
        subject: 'Invoice Form',
        html: `<div>
                    <div>Name: ${data.name}</div>
                    <div>Email Id: ${data.emailId}</div>
                    <div>Wallet Address: ${data.walletAddress}</div>
                    <div>Amount: ${data.amount.value} ${data.amount.currency}</div>
                </div>`,
      };

      await sendEmail(mailOptions);
    }

    return res.json({
      success: true,
      message: 'Invoice has been created successfully!',
      data,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
