import { Button, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function BlogPage() {
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('isEdit')
  const navigate = useNavigate()
  const [dataSpecialty,setDataSpecialty] = useState([])
  const handelFetchData = async()=>{
    const {data} = await axios.get('https://localhost:7212/api/Specialty')
    setDataSpecialty(data)
  }
  useEffect(()=>{
    handelFetchData()
  },[])
  const dataSource = dataSpecialty.map((items:any,index:number)=> {
    return {
      stt : index + 1,
      key:items.specialtyID,
      name :items.specialtyName
  
    }
  })
  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      render:({key}: any)=>{
        return <div className="space-x-5">
          <Button onClick={()=>{
              navigate('/manager/blogs/create?id=' + key)
          }}>Edit</Button>
          <Button onClick={
            ()=>{
              if(window.confirm('Are you sure you want to delete this item?')){
                axios.delete('https://localhost:7212/api/Specialty/' + key).then(()=>{
                  handelFetchData()
                }).catch((error)=> console.log(error))
              }
            }
          }>Delete</Button>
        </div>
      }
    }
  ];
  
  return <div>
     <h2 className='pl-5 mb-5 !text-black '>Chuyên ngành</h2>
  <Table dataSource={dataSource} columns={columns} />
  </div>
}
