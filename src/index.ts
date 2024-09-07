import express, { Express } from "express";
import { restaurantsRoute } from "./routes/Restaurant.route";
import cors from "cors";

import { reservationRoutes } from "./routes/Reservation.route";
import { tablesRoute } from "./routes/Tables.route";
import { giftCardRouter } from "./routes/Giftcards.route";
import { sendMail } from "./controllers/Giftcards.controller";

const PORT = process.env.PORT || 3000;

const app: Express = express();

async function main() {
  // Connect to database
  // await connectDB(); // Ensure the database connection is established
  // Middleware
  app.use(express.json());
  app.use(cors());

  // Routes
  app.use("/api/tables", tablesRoute);
  app.use("/api/restaurants", restaurantsRoute);
  app.use("/api/reservations", reservationRoutes);
  app.use("/api/giftcard", giftCardRouter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  // const emailHtmlContent = `
  // <!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <title>Your Gift Card from Tabit is Ready!</title>
  //   <style>
  //     body {
  //       font-family: Arial, sans-serif;
  //       background-color: #f5f5f5;
  //       color: #333;
  //       margin: 0;
  //       padding: 0;
  //     }
  //     .container {
  //       max-width: 600px;
  //       margin: 20px auto;
  //       background-color: #ffffff;
  //       padding: 20px;
  //       border-radius: 8px;
  //       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  //     }
  //     .header {
  //       background-color: #1a73e8;
  //       padding: 20px;
  //       border-radius: 8px 8px 0 0;
  //       color: #ffffff;
  //       text-align: center;
  //     }
  //     .header h1 {
  //       margin: 0;
  //       font-size: 24px;
  //     }
  //     .content {
  //       padding: 20px;
  //       text-align: center;
  //     }
  //     .content p {
  //       font-size: 18px;
  //       line-height: 1.6;
  //     }
  //     .cta-button {
  //       display: inline-block;
  //       margin: 20px auto;
  //       padding: 12px 20px;
  //       background-color: #1a73e8;
  //       color: #ffffff;
  //       text-decoration: none;
  //       border-radius: 5px;
  //       font-size: 18px;
  //     }
  //     .footer {
  //       margin-top: 30px;
  //       text-align: center;
  //       color: #777;
  //       font-size: 14px;
  //     }
  //   </style>
  // </head>
  // <body>
  //   <div class="container">
  //     <div class="header">
  //       <h1>Your Gift Card is Ready!</h1>
  //     </div>
  //     <div class="content">
  //       <p>Hi there,</p>
  //       <p>Congratulations! 🎉 You’ve just purchased a gift card worth <strong>${100} NIS</strong> to enjoy at <strong>${"restaurantName"}</strong>!</p>
  //       <p>Get ready for a delightful dining experience. Simply present this email at <strong>${"restaurantName"}</strong> to redeem your gift card and enjoy your meal!</p>
  //       <a href="" class="cta-button">View Gift Card</a>
  //     </div>
  //     <div class="footer">
  //       <p>Happy dining!</p>
  //       <p>The Tabit Team</p>
  //     </div>
  //   </div>
  // </body>
  // </html>
  // `;
  // sendMail({
  //   to: "eladlevy42@gmail.com",
  //   subject: "Tabit Giftcard",
  //   html: emailHtmlContent,
  // });
}

main();
