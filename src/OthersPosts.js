import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "./HomeMyContext";
import LikeComponent from "./LikeComponent";
import CommentsComponent from "./CommentsComponent";
import { Col, Container, Row, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Share from "./Share";
import PostComment from "./PostComment";

import "./App.css";

function OthersPosts() {
  let {
    data,
    user,
    showShareList,
    setShowShareList,
    showCommentInput,
    setShowCommentInput,
  } = useContext(MyContext);

  return data.length === 0 ? (
    <h1 className="p-5">no post to show</h1>
  ) : (
    <>
      {data.map((item, i) => (
        <Container key={i} className="py-5">
          <Row>
            <Col xs={12} className="py-3 px-1">
              <Link
                className="d-flex textLinkStyle"
                to={`/peopleProfile/${data[data.length - (i + 1)].user}`}
              >
                <Image
                  src={
                    data[data.length - (i + 1)].profilePic
                      ? data[data.length - (i + 1)].profilePic
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACUCAMAAAAqEXLeAAAAaVBMVEX///8AAAD7+/v19fXi4uL4+PjHx8fx8fFeXl4wMDDX19fc3NxQUFDf39/q6uo7OzuVlZVAQEC5ubmPj4+rq6ttbW2cnJwqKio1NTWlpaV+fn4MDAzNzc11dXUbGxuxsbEiIiJHR0eGhoZSHpojAAAHHklEQVR4nO1c2YKjKBQNirvBJbGMRpPo/39kl1NT0xEBOYhWPcx57S5yBO5+L6fT//htcDxGY78sn8+y9GPKPOenGb3DYbH/0Ya3O5nhfgvbDz9mv4Br4OfV8CJSvIYq94MfJOgmTXqX83vb1LRJ3B+hGDepDsFvpE18OEW/ihCKE6LKP5CgQ3OU4DdyepAcxW1typGQuj3i1M+9QpZ18OrPO1OMx20MvzDuuZtuDkuLGFG+m0YqN9xFHnW5C0Vm5aT/YmT2OfqFXY6EFLbVZmCsGVXIrRp1Gu7BkZCQ2uPY3fbhSMits8XxQ8vVMcP9wxLH/ShOsMEyqPblSEi1WXzc3Tl+stxoftx+f46E9JtYBjupHh7hhhP3DtnHCb1nzLE9iiMhrSnLXUyhDLkZx/JIjoQY+W7+41iSDwOniFp3zdZQ4N7GQcrnHSHKcWeDLQZoxruNcasZXpDjFhx+Ib9QIJbnQC0+Rwsc9k9xJET7wBmU03vHq0jDT6SF8ZVOdQPdxmz94VJ21P20wZ5Lu/IymK3S6HH0TEKaRxtzTqEbtyY2667naVzwlYdGKJZBM+BrXXQ4Ujx+vUgNGsW/+KZjHeFlb4lquQT+Zo2tPKOC2a/II0Pd+9d6khU12v1qEtxBWa6acAdcUMuhRl38te++YsuNWgrDA1ObV/VyLuZGpjoUJ2A2LFTH4VjMkGkna1mGrLsSSWD656nL8XR6QgsrtVAApe57fY6nEyTitcqvxKJYKHCi0NKq+BYSmwrheDpB6TlFTMYgsQHLWjGy9kMuktBpo5kwLEMnP29I58JpZMjgjla+9QEXMWPkMknPKUHKmxGcnXWh5WX+H3QlQdmeAMm37FJCzoqWlz8HZM5k7hUkfoBJ/AZkGmWaElkD1ZITIE1JxGuw30VSrM6x5IpBt8cZ+gFxwgVzynffSbF7jvmSBjVg7KjE6gML6vaWbom3ioU3e+tJsQ5ysGBpb4tDUlFg62Ip6J1tNyGF6AewgI48YMnpsEygMBRFs2lwMRDMYwiza2ewD007cfwv0CR3JDIXkDc5AawF+uDyQo8yRklq51i+gFYLIpFNg3eSKJOni+XR1YU7eYZTshXQn+vAXTE30Z2kmAqaoFnOmICXXTKRdIN6ckKtfeAJ3h8q1JPeAK9DMk2z4+IbQAZhftakWKfXHGXUpiVWHka9AtJMwzuMGm3FkZhZ/Xh9Lw3b3cRVZcM2oHAl2jkbdnOIfQPTPiB1htu4c0ecwsDipHf00qgsNu92E68ZGK9HbuISKL1saAaWpNU2NeSHPpspNo/5m1qLasnZbGw6rfumnKbspqm7suk3ziDIYqjtDUv3KBvSdMii7f3UskTyDzaxLCELoc4GFnYvZDLte0QntC7khgy/lEVYhaFSROr087/gXWXy2oYP3ve2o8wNWPKUKpvwmbDAZbQDHYO73Io5iNqo2zd1Sy+C+5y9q/gAmtGrFZEJYMT4YTRajsP7vw9jyVkhZAhOVQDWVkKZv/xUJ6Bdcxmrarw0HQ0E/8HXVh+qHI6n552/DPutP91BvYaeVNnaoSXf2YbhLr3NVNctddIYWwYV9AqYwuTFG9ZFJ984suusRwBrfROr7vlKz44OVsscq837ajc1sjJr6Ksv1W11AWWJ4G5pOK5Tmrb1wgZT2VlrM5uqZGWhkZ2V3xiTEQopS3kQqXPr5Y3wBvUlOaTXSq8hXibgBuUlFWSlJ825HPFWtpafNHDE3luh+efCrYysj2MzoSLSHXASfuMOzwSIUib653VeqjFLc7lzLN2ZO1DrX6ihbU6FDEtnAzK6fNxobQx7Dt7Jxkq/XAs7MCaDYX771W31S8ztllbS2QTzsAe2aPM//9jl3RdnLjn4VnCX2qpJ/MbcNJoIJ1f6BapfuphXydDS9Bc4XWtdU3Ja0tBacObRsohzZs34rRbOnaosPq1BOU284c5zJ1JY0+kd52ltuku8dW2Mx+7f4fGF5W333eFZVhY8NsYb3c1amA/lh82Bjj9wSxpnlv7iyYdMa8VENRalxocVO7HI/0a58ZmzxStYipwuhJg/H1JfjfzL4LrI9g7WPH7BVN/tCu8muy5TOGvzhAhcQSZ5uEA/wEQTwKPdl8s6UfIzLfWewHRYKUohZ9b9fSrMXBbtM1nh6STPVhjJ9xat7H8/JslsROnoS0/N9cdUkucr93k/kbXSjN1URu4SygLX9TzXDRhNOlU5+d7u8PTbFxxfWZ2oizSs/kGYFsrSUiqosNiDV1p4fKIorbgpKpryQqIewufeFCcEzw27WTwPew83rozaVG7VsS/Mnhv41MNm73dGl3DjFpj8f438ExSHIc6rYrWQfy+q/PiHhN/h0e7aK4qaWX/t6BHivArHjcu8D4cii6L6E1GUFUPY52Xs/oI3uDl4AT0ncZycafArNu9Q/AFjw2xBKOtTIAAAAABJRU5ErkJggg=="
                  }
                  width="50px"
                  height="50px"
                  alt="profile pic"
                  roundedCircle
                  className="pe-2"
                />
                <h1>{data[data.length - (i + 1)].user}</h1>
              </Link>
            </Col>
          </Row>

          <Row className="">
            <Col md={6}>
              <Container fluid>
                <Row>
                  <Col xs={12} className="py-3 px-1">
                    <Image
                      src={data[data.length - (i + 1)].post}
                      alt=""
                      width="100%"
                      rounded
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col md={6} className="py-3 px-1">
              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex pb-2 display-6">
                  <b className="pe-2">{data[data.length - (i + 1)].user}:</b>
                  <i>{data[data.length - (i + 1)].caption}</i>
                </div>
                <div className="d-flex justify-content-evenly align-items-start">
                  <div>
                    <LikeComponent
                      target={data[data.length - (i + 1)]._id}
                      purpose={
                        data[data.length - (i + 1)].likes.some(
                          (likeItem) => likeItem.likes === user
                        )
                          ? "dislike"
                          : "like"
                      }
                      totalLikes={data[data.length - (i + 1)].likes.length}
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <FontAwesomeIcon
                      icon={faComment}
                      className="iconStyle"
                      title="comment"
                      onClick={() => {
                        setShowCommentInput(!showCommentInput);
                        setShowShareList(false);
                      }}
                    />
                    <h5>comment</h5>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <FontAwesomeIcon
                      icon={faShare}
                      className="iconStyle"
                      title="share"
                      onClick={() => {
                        setShowShareList(!showShareList);
                        setShowCommentInput(false);
                      }}
                    />
                    <h5>Share</h5>
                  </div>
                </div>
                {showShareList ? (
                  <Share targetedPic={data[data.length - (i + 1)].post} />
                ) : null}
                {showCommentInput ? (
                  <PostComment target={data[data.length - (i + 1)]._id} />
                ) : null}
                <CommentsComponent target={data[data.length - (i + 1)]._id} />
              </div>
            </Col>
          </Row>
        </Container>
      ))}
    </>
  );
}

export default OthersPosts;
