import React, { useEffect, useState } from "react";
import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./DashBoard.css";
import ChartDashBoard from "./ChartDashBoard";
import { useSelector } from "react-redux";
import { axiosClient } from "services/config.services";

export default function DashBoard() {
  const orders = useSelector((state) => state.allOrder.order);
  const [analytic, setAnalytic] = useState()

  const getVisitDaily = async() => {
    const data = await axiosClient.get('http://localhost:4000/user/dailyVisit')
    setAnalytic(pre => ({...pre, visitDaily:data.data}))
  }
  useEffect(() => {
    const ordersSuccess = orders?.filter(item => item.status == 'paid') 
    if(ordersSuccess) {
      const totalSales = ordersSuccess.reduce((total, currentValue) => {
        return total + currentValue.orderItems.reduce((totalItem, currentQuantity) => {
            return totalItem + +currentQuantity.qty
          }, 0
        )
      }, 0)
      const totalOrder = ordersSuccess.length
      const totalIncome = ordersSuccess.reduce((total, currentValue) => {
        return total + currentValue.totalPrice
      }, 0)
      getVisitDaily()
      setAnalytic({
        totalIncome,
        totalSales,
        totalOrder
      })
    }
    return () => {
      
    }
  }, [])
  

  return (
    <section id="dashboard">
      <div className="dashboard">
        <div className="dashboard-top">
          <div className="dashboard-top-search">
            <form>
              <input placeholder="Search ..."></input>
              <span>
                <SearchOutlined></SearchOutlined>
              </span>
            </form>
          </div>
          <div className="dashboard-top-content">
            <li className="dashboard-top-content-avatar">
              <img src="https://res.cloudinary.com/caokhahieu/image/upload/v1626334932/gediogbkwlg85kbbsamq.jpg"></img>
              <span>Do Hai Dang</span>
            </li>
            <li className="dashboard-top-content-bell">
              <BellOutlined></BellOutlined>
            </li>
          </div>
        </div>

        <div className="dashboard-middle">
          <div className="dashboard-middle-statistic">
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <ShoppingOutlined></ShoppingOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{analytic?.totalSales}</span>
                  <span className="title">Total Sales</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <ShoppingCartOutlined></ShoppingCartOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{analytic?.visitDaily}</span>
                  <span className="title">Daily Visits</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <DollarCircleOutlined></DollarCircleOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{analytic?.totalIncome}</span>
                  <span className="title">Total Income</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <FileTextOutlined></FileTextOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{analytic?.totalOrder}</span>
                  <span className="title">Total Orders</span>
                </div>
              </li>
            </div>
          </div>
          <ChartDashBoard></ChartDashBoard>
        </div>

        <div className="dashboard-new">
          <div className="dashboard"></div>
          <div className="dashboard"></div>
        </div>
      </div>
    </section>
  );
}
