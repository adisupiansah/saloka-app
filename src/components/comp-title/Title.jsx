import React from 'react'

const Title = ({ title, subTitle}) => {
  return (
    <div className='title-dashboard'>
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-12">
               <div className="card-titleDashboard container">
                    <h1 className=''>{title}</h1>
                    <p className='mt-1'>{subTitle}</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Title
