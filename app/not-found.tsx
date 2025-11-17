import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={`container mt-5 ${styles.container}`}>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8 text-center">
          {/* Animated Ice Cream Elements */}
          <div className="mb-4">
            <span className={styles.bounceAnimation} style={{ fontSize: '4rem' }}>🍦</span>
            <span className={`${styles.bounceAnimation} ${styles.delay1}`} style={{ fontSize: '4rem' }}>😢</span>
            <span className={`${styles.bounceAnimation} ${styles.delay2}`} style={{ fontSize: '4rem' }}>🍨</span>
            <span className={`${styles.bounceAnimation} ${styles.delay3}`} style={{ fontSize: '4rem' }}>💔</span>
            <span className={`${styles.bounceAnimation} ${styles.delay4}`} style={{ fontSize: '4rem' }}>🍧</span>
          </div>
          
          <div className={`card shadow-lg border-0 rounded-3 ${styles.customCard}`}>
            <div className="card-body p-5">
              {/* Error Code dengan Style Ice Cream */}
              <div className="mb-4">
                <h1 className={`display-1 fw-bold ${styles.gradientText}`}>
                  404
                </h1>
              </div>
              
              <h2 className="h1 mb-4 text-dark">Oops! Ice Cream Not Found! 🍦</h2>
              
              <p className="lead mb-4 fs-5">
                Sorry, the ice cream page you're looking for has <strong>melted away</strong> 
                <br />or doesn't exist in our freezer! ❄️
              </p>
              
              {/* Fun Alert Message */}
              <div className={`alert alert-warning mb-4 border-0 ${styles.customAlert}`}>
                <div className="d-flex align-items-center">
                  <span className="fs-3 me-3">🍨</span>
                  <div>
                    <strong className="fs-5">Don't worry!</strong>
                    <p className="mb-0 mt-1">We have plenty of other delicious ice creams waiting for you!</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
                <Link href="/" className={`btn btn-primary btn-lg px-4 py-2 rounded-pill shadow ${styles.customBtn}`}>
                  🏠 Back to Home
                </Link>
                <Link href="/icecreams" className={`btn btn-success btn-lg px-4 py-2 rounded-pill shadow ${styles.customBtn}`}>
                  🍦 See My Ice Creams
                </Link>
                <Link href="/explore" className={`btn btn-info btn-lg px-4 py-2 rounded-pill shadow ${styles.customBtn}`}>
                  🔍 Explore More
                </Link>
              </div>

              {/* Fun Ice Cream Facts */}
              <div className="row mt-4 text-start">
                <div className="col-md-6">
                  <div className={`card border-0 mb-3 ${styles.factCard}`}>
                    <div className="card-body">
                      <h5 className="card-title">🍦 Ice Cream Fact</h5>
                      <p className="card-text small">
                        The first ice cream was invented in China around 200 BC when 
                        people packed a soft milk and rice mixture in snow.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={`card border-0 mb-3 ${styles.factCard}`}>
                    <div className="card-body">
                      <h5 className="card-title">😊 Stay Sweet!</h5>
                      <p className="card-text small">
                        While we fix this melted page, why not imagine your favorite ice cream flavor?
                        We recommend trying our virtual collection!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Ice Cream Icons */}
              <div className="mt-4">
                <span className={`me-3 ${styles.decorativeIcon}`}>🎂</span>
                <span className={`me-3 ${styles.decorativeIcon}`}>🧁</span>
                <span className={`me-3 ${styles.decorativeIcon}`}>🍰</span>
                <span className={`me-3 ${styles.decorativeIcon}`}>🥮</span>
                <span className={`me-3 ${styles.decorativeIcon}`}>🍮</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className={`text-center p-3 rounded ${styles.statsCard} ${styles.pinkBg}`}>
                <span className="fs-2">🍦</span>
                <h4 className="mt-2">{Math.floor(Math.random() * 50) + 20}+</h4>
                <small>Virtual Ice Creams</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`text-center p-3 rounded ${styles.statsCard} ${styles.cyanBg}`}>
                <span className="fs-2">⭐</span>
                <h4 className="mt-2">5/5</h4>
                <small>Average Rating</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`text-center p-3 rounded ${styles.statsCard} ${styles.brownBg}`}>
                <span className="fs-2">😋</span>
                <h4 className="mt-2">100%</h4>
                <small>Customer Happiness</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}