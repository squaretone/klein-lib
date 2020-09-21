import React from 'react';

const Error = ({msg}) => {
  return (
    <div className="error bg-red-700 text-white m-4 p-3 px-4 rounded mb-1 shadow">
      {msg}
    </div>
  )
}

const Errors = ({errors, className}) => {
  let baseClasses = 'errors flex flex-col p-1 py-3 bg-red-200 pb-5'
  if (className) baseClasses += ` ${className}`
  if (!errors || errors.length < 1) return null
  return (
    <React.Fragment>
      {(errors && errors.length) &&
        <div className={baseClasses}>
          {errors.map((err, index) => {
            return (
              <Error msg={err} key={`err_${index}`} />
            )
            
          })}
        </div>
      }
    </React.Fragment>
  );
};

export default Errors;
