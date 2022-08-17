import React, { useState,useEffect } from "react";

function UpdateServices(props) {

  const [services, setservices] = useState([]);
  const getServices = async () => {
    const response = await fetch("http://localhost:8085/services/getAll",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }});
    setservices(await response.json());
  };
  useEffect(() => {
    getServices();
  }, []);

  const [serId,setSerId] = useState(4);

  const [sername , setSername]  = useState('');
  const [serdesc , setDesc] = useState('');
  const [serphn , setPhn] = useState('');
  const [sertime , setTiming] = useState('');
  const [serLink , setLink] = useState(''); 

  const [remId , setRemId] = useState('');

  const remIdChangeHandler = (e)=>{
    setRemId(e.target.value);
  }

  const nameChangeHandler = (e)=>{
    setSername(e.target.value);
  }
  const descChangeHandler = (e) =>{
    setDesc(e.target.value);
  }
  const phnChangeHandler = (e) =>{
    setPhn(e.target.value);
    console.log(serphn);
  }
  const timeChangeHandler = (e)=>{
    setTiming(e.target.value);
  }
  const linkChangeHandler = (e)=>{
    setLink(e.target.value);
  }

  const addServiceSubmitHandler = (e) =>{
    e.preventDefault();
    const serviceInfo = {
      serviceName:sername,
      serviceDesc:serdesc,
      phone:serphn,
      timing:sertime,
      link:serLink
    }
    fetch("http://localhost:8085/services/add",
    {
      method:"POST",
    headers:{"Content-Type":"application/json","Authorization": `Bearer ${localStorage.getItem('token')}`},
    body:JSON.stringify(serviceInfo)
    }).then(
      alert("Service Added")
    )
    setSerId(serId+1);
    setSername('');
    setDesc('');
    setPhn('');
    setLink('');
    setTiming('');
  }

  const removeserviceSubmitHandler = (e)=>{
    e.preventDefault();
   fetch("http://localhost:8085/services/delete/"+remId , {method:'DELETE',headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}).then( res=>{ 
    setRemId("")
    alert("Service Remove Successfully.....")
   }
   )
  }
  
  const serviceAvailablity = ()=>{

  }


  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 table-responsive" style={{ marginTop: "10%" }}>
          <button
            type="button"
            className="btn btn-outline-info btn-sm d-block"
            data-bs-toggle="modal"
            data-bs-target="#addservice"
            style={{ marginBottom: "10%", float: "right" }}
          >
            add service
          </button>
          <div className="modal" id="addservice">
            <div className="modal-dialog">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#17a2b8", color: "white" }}
                >
                  <p className="h3">Add Service</p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={addServiceSubmitHandler}>
                    <div>
                      <label className="form-label mb-3" for="addnam">
                        Service Name
                      </label>
                      <input
                        type="text"
                        value={sername}
                        className="form-control"
                        name="addnam"
                        placeholder="Service Name"
                        onChange={nameChangeHandler}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label mb-3" for="adddesc">
                        Description
                      </label>
                      <textarea
                        type="text"
                        value={serdesc}
                        className="form-control"
                        name="adddesc"
                        placeholder="Description"
                        onChange={descChangeHandler}
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="form-label mb-3" for="addphn">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={serphn}
                        className="form-control"
                        name="addphn"
                        placeholder="Phone Number"
                        onChange={phnChangeHandler}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label mb-3" for="addTime">
                        Timings
                      </label>
                      <input
                        type="text"
                        value={sertime}
                        className="form-control"
                        name="addTime"
                        placeholder="Timings"
                        onChange={timeChangeHandler}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label mb-3" for="addLink">
                        Link
                      </label>
                      <input
                        type="text"
                        value={serLink}
                        className="form-control"
                        name="addLink"
                        placeholder="Learn More"
                        onChange={linkChangeHandler}
                        required
                      />
                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-info btn-sm">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-outline-info btn-sm d "
            data-bs-toggle="modal"
            data-bs-target="#removeservice"
            style={{ marginBottom: "10%", float: "right", marginRight: "2%" }}
          >
            remove service
          </button>
          <div className="modal" id="removeservice">
            <div className="modal-dialog">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#17a2b8", color: "white" }}
                >
                  <p className="h3">Add Service</p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={removeserviceSubmitHandler}>
                    <div>
                      <label className="form-label mb-3" for="remservice">
                        Service Id
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={remId}
                        name="remservice"
                        placeholder="Id You want to remove"
                        required
                        onChange={remIdChangeHandler}
                      />
                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-info btn-sm">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <table className="table table-bordered table-success table-striped">
            <thead>
              <tr>
                <th scope="col">Service Id</th>
                <th scope="col">Is Available</th>
              </tr>
            </thead>
            <tbody>
           {
            services.map((item)=>{
              return(
                <tr>
                <th scope="row">{item.serviceId}</th>
                <td>
                  <select
                    class="form-select form-select-sm text-center"
                    style={{ backgroundColor: "#f0f6f7", width: "50%" }}
                    onChange={(e)=>{
                      e.preventDefault();
                      fetch("http://localhost:8085/services/update/"+item.serviceId+"/"+e.target.value,{
                        method:'PUT',headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }
                      })
                    }}
                  >
                  <option>select</option>
                    <option value="true">
                      Yes
                    </option>
                    <option value="false">No</option>
                  </select>
                </td>
                </tr>
              )
            })
           }
            </tbody>
          </table>
        </div>
        <div className="com-md-3"></div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default UpdateServices;
