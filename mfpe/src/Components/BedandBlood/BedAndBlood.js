import { getByTestId } from "@testing-library/react";
import { parseJSON } from "jquery";
import React, { useEffect, useState } from "react";
import Bed from "../../Json/Bed.json";
import Blood from "../../Json/Blood.json";
import "./BedandBlood.css";

function BedAndBlood(props) {
  const [beds, setBeds] = useState([]);

  const [blood, setBlood] = useState([]);

  const getBeds = async () => {
    const response = await fetch("http://localhost:8083/bed/getAll",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }});
    setBeds(await response.json());
  };

  const getBlood = async () => {
    const res = await fetch("http://localhost:8083/blood/getAll",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }});
    setBlood(await res.json());
  };

  useEffect(() => {
    getBeds();
  }, [beds]);

  useEffect(() => {
    getBlood();
  }, [blood]);

  return (
    <>
      <div
        className="container blood  pt-5 pb-5 shadow-lg rounded imcov"
        style={{ backgroundColor: "cadetblue", marginTop: "16%" }}
      >
        <center className="display-5 pb-4 " style={{ color: "white" }}>
          {" "}
          <b>Blood Count</b>
        </center>
        <div className="row ">
          <div className="col-md-2" />
          <div className="container col-md-8">
            <table className="table  table-success table-striped">
              <thead>
                <tr className="text-center">
                  <th scope="col">S. No.</th>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Available</th>
                </tr>
                {blood.map((blood) => {
                  return (
                    <tr className="text-center">
                      <th>{blood.bloodId}</th>
                      <td>{blood.bloodType}</td>
                      <td>{blood.bloodCount} Units</td>
                    </tr>
                  );
                })}
              </thead>
            </table>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
      <div
        className="container bed pt-5 pb-5 shadow-lg rounded imcov"
        style={{
          backgroundColor: "cadetblue",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <center className="display-5 pb-4" style={{ color: "white" }}>
          {" "}
          <b>Bed Count</b>
        </center>
        <div className="row ">
          <div className="col-md-2" />
          <div className="container col-md-8">
            <table className="table  table-success table-striped">
              <thead>
                <tr className="text-center">
                  <th>Sr. No</th>
                  <th>Bed Type</th>
                  <th>Bed Count</th>
                </tr>

                {beds.map((bed) => (
                  <tr className="text-center">
                    <th>{bed.bedId}</th>
                    <td>{bed.bedType}</td>
                    <td>{bed.bedCount}</td>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    </>
  );
}

export default BedAndBlood;
