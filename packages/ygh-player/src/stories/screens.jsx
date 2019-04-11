// import React from "react"
//
// import { storiesOf } from "@storybook/react"
// import {
//   withKnobs,
//   boolean,
//   radios,
//   text,
//   number
// } from "@storybook/addon-knobs"
//
// import withTheme from "./decorators/withTheme"
//
// import {
//   Camera,
//   Computer,
//   Mailbox,
//   Note,
//   SafeWithCode,
//   SafeWithKeyhole
// } from "your-gift-hunt/screens"
//
// const noop = () => {}
//
// storiesOf("Screens", module)
//   .addDecorator(withTheme)
//   .addDecorator(withKnobs)
//   .add("Camera", () => (
//     <Camera
//       isVisible={boolean("Visible", true)}
//       error={boolean("Error") ? "This code is invalid" : null}
//       entities={[
//         {
//           id: "qr-code-one",
//           state: radios(
//             "State (qr-code-one)",
//             {
//               Unscanned: "unscanned",
//               Scanned: "scanned"
//             },
//             "unscanned"
//           ),
//           inputValues: {
//             code: "12345"
//           },
//           fieldValues: {}
//         }
//       ]}
//     />
//   ))
//   .add("Computer", () => (
//     <Computer
//       isVisible={boolean("Visible", true)}
//       error={boolean("Has error", true) ? "" : null}
//       entities={[
//         {
//           id: "question-one",
//           state: radios(
//             "State",
//             {
//               Unanswered: "unanswered",
//               Answered: "answered"
//             },
//             "unanswered"
//           ),
//           inputValues: {
//             answer: text("Answer", "42, duhh.")
//           },
//           fieldValues: {
//             question: "This is a question. What is your answer?"
//           }
//         }
//       ]}
//     />
//   ))
//   .add("Mailbox", () => (
//     <Mailbox
//       isVisible={boolean("Visible", true)}
//       entities={new Array(
//         number("Amount of mail", 2, {
//           min: 1,
//           max: 5,
//           step: 1
//         })
//       ).fill({ id: "welcome-note" })}
//     />
//   ))
//   .add("Note", () => (
//     <Note
//       isVisible={boolean("Visible", true)}
//       entity={{
//         id: "welcome-note",
//         state: radios(
//           "State",
//           {
//             Unread: "unread",
//             Read: "read"
//           },
//           "unread"
//         ),
//         inputValues: {},
//         fieldValues: {
//           text: text(
//             "Text",
//             "Hi there Pioneer, you just found a secret. You can be one of the first to play the upcomming demo hunt, if you check out https://yourgifthunt.com/pioneer."
//           )
//         }
//       }}
//     />
//   ))
//   .add("SafeWithCode", () => (
//     <SafeWithCode
//       isVisible={boolean("Visible", true)}
//       error={boolean("Has error", true) ? "" : null}
//       entity={{
//         id: "safe-with-code",
//         state: radios(
//           "State",
//           {
//             Locked: "locked",
//             Unlocked: "unlocked"
//           },
//           "locked"
//         ),
//         inputValues: {
//           code: text("Code", "1538")
//         },
//         fieldValues: {}
//       }}
//     />
//   ))
//   .add("SafeWithKeyhole", () => (
//     <SafeWithKeyhole
//       isVisible={boolean("Visible", true)}
//       entity={{
//         id: "safe-with-keyhole",
//         state: radios(
//           "State",
//           {
//             Locked: "locked",
//             Unlocked: "unlocked"
//           },
//           "locked"
//         ),
//         fieldValues: {}
//       }}
//     />
//   ))
