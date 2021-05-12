import React from "react";

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://www.algosoft.co/blog/wp-content/uploads/2019/07/React-is-Taking-the-Web-Development-Industry.jpg"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Welcome</h1>
            <p>
              Hello! Welcome to our page. Have a look at our list of employees by clicking the Employees button above! 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;