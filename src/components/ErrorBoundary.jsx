// 1. ClassComponent
import React from 'react';
// import teamsWebhook from '../utils/teamsWebhook';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log('error :>> ', error);
    console.log('errorInfo :>> ', errorInfo);
    // teamsWebhook(error);
    // errorInfo
    // at App (http://localhost:3000/static/js/bundle.js:32:51)
    // at ErrorBoundary (http://localhost:3000/static/js/bundle.js:126:1)"
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;


// import React from "react"
// const MyErrorBoundary = React.Catch(function MyErrorBoundary(props, error) {
//   if (error) {
//     return (
//       <div className="error-screen">
//         <h2>An error has occured</h2>
//         <h4>{error.message}</h4>
//       </div>
//     )
//   } else {
//     return <React.Fragment>{props.children}</React.Fragment>
//   }
// });

// export default MyErrorBoundary;

// import React from "react"

// const ErrorBoundary = React.Catch(
//   function ErrorBoundary(props, error) {
//     // if (error) {
//     //   // Sentry or Teams hook


//     //   // fallback ui
//     //   return (
//     //     <div className="error-screen">
//     //       <h2>An error has occured</h2>
//     //       <h4>{error.message}</h4>
//     //     </div>
//     //   )
//     // } else {
//       return <React.Fragment>{props.children}</React.Fragment>
//   //   }
//   }
// );
// const ErrorBoundary = (props, error) => {
//   console.log('props', props)
//   console.log('error', error)
//     if (error) {
//       // Sentry or Teams hook


//       // fallback ui
//       return (
//         <div className="error-screen">
//           <h2>An error has occured</h2>
//           <h4>{error.message}</h4>
//         </div>
//       )
//     } else {
//       return <React.Fragment>{props.children}</React.Fragment>
//     }
//   }

// export default ErrorBoundary;

// import React, { Catch } from 'react'

// const ErrorBoundary = ({ children }) => {
//   return (
//     <div>{children}</div>
//   )
// }

// export default ErrorBoundary