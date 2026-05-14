import { Worker }

from "bullmq";

import { sendEmail }

from "../services/email.service.js";

const emailWorker =
new Worker(

  "emailQueue",

  async (job) => {

    console.log(
      "📩 Processing Email Job"
    );

    console.log(job.data);

    await sendEmail({

      to: job.data.to,

      subject: job.data.subject,

      html: job.data.html

    });

    console.log(
      "✅ Email Sent Successfully"
    );

  },

  {
    connection: {

      host: "127.0.0.1",

      port: 6379

    }
  }

);

emailWorker.on(

  "completed",

  (job) => {

    console.log(
      `✅ Job ${job.id} completed`
    );

  }

);

emailWorker.on(

  "failed",

  (job, err) => {

    console.log(
      `❌ Job ${job.id} failed`
    );

    console.log(err);

  }

);