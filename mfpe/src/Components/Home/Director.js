import React from "react";
import directorImg from "../../Images/p1.jpeg";

function Director(props) {
  return (
    <div className="container-fluid director shadow-lg p-3 mb-5 rounded  col-12 pt-5 pb-5">
      <div className="row">
        <div className="col-lg-5 text-center ">
          <img src={directorImg} style={{ height: 250, width: 250 }} />
        </div>
        <div className="col-lg-7 text-center align-self-center">
          <blockquote class="blockquote">
            <p style={{ fontSize: "35px" }} className="blockq">
              “It takes 20 years to build a reputation and five minutes to ruin
              it. If you think about that, you’ll do things differently.”{" "}
            </p>
            <br />
            <footer class="blockquote-footer">
              Warren Buffett, CEO of Berkshire Hathaway."
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Director;
