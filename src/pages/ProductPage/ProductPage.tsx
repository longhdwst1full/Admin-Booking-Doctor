import { Table,Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

export default function ProductPage() {
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('isEdit')
  const navigate = useNavigate()
  const [dataSpecialty,setDataSpecialty] = useState([])
  const handelFetchData = async()=>{
    const {data} = await axios.get('https://localhost:7212/api/Services')
    setDataSpecialty(data)
  }
  useEffect(()=>{
    handelFetchData()
  },[])
  const dataSource = dataSpecialty.map((items:any,index:number)=> {
    return {
      stt : index + 1,
      key:items.serviceId,
      name :items.serviceName,
      description : items.description,
      cost : items.cost
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
      title: 'cost',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      render:({key}: any)=>{
        return <div className="space-x-5">
          <Button onClick={()=>{
              navigate('/manager/products/create?id=' + key)
          }}>Edit</Button>
          <Button onClick={
            ()=>{
              if(window.confirm('Are you sure you want to delete this item?')){
                axios.delete('https://localhost:7212/api/Services/' + key).then(()=>{
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
