const API_URL = 'http://localhost:8000/v1'

  // Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  return await response.json()
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const allLaunches = await fetch(`${API_URL}/launches`)
  const responseJson = await allLaunches.json()
  return responseJson.sort((a,b)=>{//for sorting launches according to flightNumber
    return a.flightNumber - b.flightNumber
  })
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`,{
      'method':'post',//fetch defaults to get. So, we explicity have to define post
      'headers':{
        "Content-Type":'application/json',  
      }
        ,//due to we're sending json, we have to set header for it.
      'body': JSON.stringify(launch)//fetch doesn't accept object. So, we have to stringify it before sending
    })
  } catch (err) {
      return {ok:false}//in useLaunches, there's response.ok and we set ok to false to determine that response is not correctly sent.
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`,{
      method: 'delete'
    })
    
  } catch (error) {
    return {ok: false}
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};