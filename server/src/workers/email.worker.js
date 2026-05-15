import { Worker }

from "bullmq";

import { sendEmail }

from "../services/email.service.js";
import logger from "../utils/logger.js";
const emailWorker =
new Worker(

  "emailQueue",

  async (job) => {

    logger.info(
      "📩 Processing Email Job"
    );

    logger.info("Email Job Data:", job.data);

    await sendEmail({

      to: job.data.to,

      subject: job.data.subject,

      html: job.data.html

    });

    logger.info("✅ Email Sent Successfully");

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

    logger.info(`✅ Job ${job.id} completed`);

  }

);

emailWorker.on(

  "failed",

  (job, err) => {

    logger.error(`❌ Job ${job.id} failed`);

    logger.error(err);

  }

);