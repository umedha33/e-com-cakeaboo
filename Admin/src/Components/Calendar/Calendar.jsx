import React, { useState } from 'react'
import './Calendar.css'
import dummyAdminOrders from '../Assets/dummyAdmin-orders';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const getMonthYear = () => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return (
            <div className="monthYear-lbl">
                <h1>
                    {`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                </h1>
            </div>
        );
    };

    const getOrderCountsByDate = () => {
        const counts = {};
        dummyAdminOrders.forEach(order => {
            const deliveryDate = new Date(order.deliveryDate);
            const key = `${deliveryDate.getMonth()}/${deliveryDate.getDate()}/${deliveryDate.getFullYear()}`;
            if (!counts[key]) {
                counts[key] = 0;
            }
            counts[key]++;
        });
        return counts;
    };

    const handleDayClick = (day) => {
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(selected);
    };

    const renderCalendar = () => {
        // const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
        const orderCounts = getOrderCountsByDate();

        const days = [];
        for (let i = 1; i <= endDay.getDate(); i++) {
            days.push(i);
        }

        const totalCells = Math.ceil(days.length / 7) * 7;
        const emptyEndDays = totalCells - days.length;
        for (let i = 0; i < emptyEndDays; i++) {
            days.push(null);
        }

        return (
            <div className="calndr-return">
                <div className="calendar-grid">
                    {days.map((day, index) => {
                        const dateKey = `${currentDate.getMonth()}/${day}/${currentDate.getFullYear()}`;
                        const orderCount = orderCounts[dateKey] || 0;
                        const isSelectedDay = selectedDate && day === selectedDate.getDate() && selectedDate.getMonth() === currentDate.getMonth();
                        return (
                            <div key={index}
                                className={`calendar-day ${isCurrentMonth && day === today.getDate() ? 'highlight' : ''} ${isSelectedDay ? 'dy-active' : ''}`}
                                onClick={() => day && handleDayClick(day)}>
                                <div>{day}</div>
                                {orderCount > 0 && <div className="order-count">{orderCount}</div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderOrderDetails = () => {
        if (!selectedDate) return null;
        const formattedDate = `${selectedDate.getMonth()}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
        const ordersForDay = dummyAdminOrders.filter(order => {
            const orderDate = new Date(order.deliveryDate);
            return `${orderDate.getMonth()}/${orderDate.getDate()}/${orderDate.getFullYear()}` === formattedDate;
        });

        if (ordersForDay.length === 0) return null;

        return ordersForDay.map(order => (
            <div key={order.orderID} className="order-card">
                <div className="ord-card-titles">
                    <h3>{order.orderTitle}</h3>
                    <h3>ORDER ID: {order.orderID}</h3>
                </div>
                <p><span>Date: </span>{order.orderDate}</p>
                <p><span>Name: </span>{order.custName}</p>
                <p><span>Phone: </span>{order.custPhone}</p>
                <p><span>Adress: </span>{order.custAddress}</p>
                <p><span>Status: </span>{order.orderStatus}</p>
            </div>
        ));
    };

    const displaySelectMessage = !selectedDate || (selectedDate && renderOrderDetails() === null);

    const handlePrevMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(newDate);
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(newDate);
        setSelectedDate(null);
    };


    return (
        <div className='calendar-container'>
            <div className="caln-body">
                <div className="calendar-section">
                    {renderCalendar()}
                </div>
                <div className="month-year">
                    <div className="month-info-panel">
                        <div className="calendar-header">
                            {getMonthYear()}
                            <div>
                                <button onClick={handlePrevMonth}>Prev</button>
                                <button onClick={handleNextMonth}>Next</button>
                            </div>
                        </div>
                        <div className="calender-bottom">
                            {displaySelectMessage && <p>Select a date to view its orders</p>}
                            <div className="order-list-cards">
                                {renderOrderDetails()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
