import notFound from '../Images/notfound.png'
import './index.css'

const NotFound = () => (
  <div className="not-found">
    <img src={notFound} alt="not-found" />
    <h2>PAGE NOT FOUND</h2>
    <p>we’re sorry, the page you requested could not be found.</p>
    <p>Please go back to the homepage</p>
    <button type="button" className="btn">
      Home
    </button>
  </div>
)

export default NotFound
