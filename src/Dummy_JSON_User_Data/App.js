import {Component} from 'react'
import axios from 'axios'

export default class App extends Component
{
  constructor()
  {
    super()
    this.state = {
      user : [],
      skip : 0,
      genderStatus : undefined,
      bg : undefined,
      range : undefined
    }
  }

  componentDidMount()
  {
    this.loadData(this.state.skip)
  }

  loadData = async (skip)=>{
    const url  = "https://dummyjson.com/users?limit=10&skip="+skip
    const response = await axios.get(url)
    this.setState({user:response.data.users})
  }

  next = ()=>{
    if(this.state.skip==90)
    alert("No Data Ahead !")
    else {
    let skip = this.state.skip+10
    this.setState({skip:skip})
    this.loadData(skip)
    }
  }

  previous = ()=>{
    if(this.state.skip==0)
    alert("No Previous Data")
    else {
      let skip = this.state.skip-10
      this.setState({skip:skip})
      this.loadData(skip)
    }
  }

  change = ()=>{
      let gender = this.g.value
      if(gender=="Choose Gender")
      this.setState({genderStatus:undefined})
      else
      this.setState({genderStatus:gender})
  }

  changeBlood = ()=>{
    let bloodG = this.blood_group.value
    if(bloodG=="Choose Blood-Group")
    this.setState({bg:undefined})
    else
    this.setState({bg:bloodG})
  }

  range = ()=>{
    let value = this.rangeValue.value
    this.setState({range:value})
  }

 render()
 {
  let smallerAge = this.state.user.map(ob=>ob.age).sort(this.a,this.b=this.a-this.b)[0]
  let Higher_Age = this.state.user.map(ob=>ob.age).sort(this.a,this.b=this.a-this.b)
  let HigherAge = Higher_Age[Higher_Age.length-1]
  // console.log(smallerAge)
  // console.log(HigherAge)
  let arr = new Set(this.state.user.map(ob=>ob.bloodGroup))
  console.log(arr)
  let obj = Array.from(arr)
  console.log(obj)
  // console.log(obj)
    return <div>
      <h1 className='bg-primary text-center text-white'>User Records</h1>
      <hr />
      <h2>Filter's</h2>
      <div className='row mt-3'>
        <div className='col-xl-4 col-lg-4'>
            <select className='form-control' onChange={this.change} ref={ob=>this.g=ob}>
              <option>Choose Gender</option>
              <option>male</option>
              <option>female</option>
            </select>
        </div>
        <div className='col-xl-4 col-lg-4'>
            <select className='form-control' onChange={this.changeBlood} ref={ob=>this.blood_group=ob}>
              <option>Choose Blood-Group</option>
              {obj.map(ob=><option>{ob}</option>)}
            </select>
        </div>
        <div className='col-xl-4 col-lg-4'>
            <b className='text-dark'>{smallerAge}</b>
            <input type="range" onChange={this.range} ref={ob=>this.rangeValue=ob} min={smallerAge} max={HigherAge}/>
            <b className='text-dark'>{HigherAge}</b>
        </div>
      </div>
      <hr />
      <button onClick={this.previous} className='btn btn-primary'>Previous</button> &nbsp; &nbsp;
      <button onClick={this.next} className="btn btn-success">Next</button> 
      <table className='table mt-3'>
        <thead className='alert-primary'>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Blood-Group</th>
            <th>Gender</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody className='bg-secondary text-white'>
          {this.state.user.filter(obj=>(this.state.genderStatus==undefined || this.state.genderStatus==obj.gender) && (this.state.bg==undefined || this.state.bg==obj.bloodGroup) && (this.state.range==undefined || this.state.range>=obj.age)).map(ob=><tr>
            <td>{ob.id}</td>
            <td>{ob.firstName} {ob.lastName}</td>
            <td>{ob.age}</td>
            <td>{ob.bloodGroup}</td>
            <td>{ob.gender}</td>
            <td>
              <img src={ob.image} width={50} height={50}/>
            </td>
          </tr>)}
        </tbody>
      </table>
      <br />
      
    </div>
 }
}