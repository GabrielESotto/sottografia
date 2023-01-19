import './PhotosRender.css'

const PhotosRender = () => {
  return (
    <>
      <div className="photos-container">
        <div className="spacing-header">
          <div className="wrapper-photos">

            <div className="first-row">
              <div className="first-photos" />
              <div className="wrap-two">
                <div className="first-photos shortly" />
                <div className="first-photos shortly" />
              </div>
              <div className="last-first-photo" />
            </div>

            <div className="second-row">
              <div className="second-photos longer" />
              <div className="second-photos" />
            </div>

            <div className="first-row reverse">
              <div className="first-photos" />
              <div className="wrap-two">
                <div className="first-photos shortly" />
                <div className="first-photos shortly" />
              </div>
              <div className="last-first-photo" />
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default PhotosRender
