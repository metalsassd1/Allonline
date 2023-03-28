/*ชินวัตร บูรพา*/ 

import './Footer.css'
 export default function Footer() {
    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Untitled</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" />
        <link rel="stylesheet" href="assets/css/style.css" />
        <div className="footer-clean">
          <footer>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-sm-4 col-md-3 item">
                  <h3>บริการลูกค้า</h3>
                  <ul>
                    <li><a href="nolink">ศูนย์ช่วยเหลือ</a></li>
                    <li><a href="nolink">วิธีสั่งซื้อและชำระเงิน</a></li>
                    <li><a href="nolink">ประกาศจากทางเว็บไซต์</a></li>
                  </ul>
                </div>
                <div className="col-sm-4 col-md-3 item">
                  <h3>เกี่ยวกับเรา</h3>
                  <ul>
                    <li><a href="nolink">Company</a></li>
                    <li><a href="nolink">Team</a></li>
                    <li><a href="nolink">Legacy</a></li>
                  </ul>
                </div>
                <div className="col-sm-4 col-md-3 item">
                  <h3>เว็บไซต์</h3>
                  <ul>
                    <li><a href="https://www.shopat24.com/blog/">Web Official Blog</a></li>
                    <li><a href="https://www.amulet24.com/">Amulet24</a></li>
                    <li><a href="https://www.24shopping.co.th/">24Shopping</a></li>
                  </ul>
                </div>
                <div className="col-lg-3 item social"><a href="https://www.facebook.com/ShopAt24/"><i className="icon ion-social-facebook" /></a><a href="https://twitter.com/ShopAt24"><i className="icon ion-social-twitter" /></a><a href="nolink"><i className="icon ion-social-snapchat" /></a><a href="https://www.instagram.com/shopat24/"><i className="icon ion-social-instagram" /></a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
