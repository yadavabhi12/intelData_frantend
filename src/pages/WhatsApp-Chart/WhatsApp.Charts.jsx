
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './WhatsApp.Charts.css'

// Sample data for WhatsApp user activity over the last month
const generateWhatsAppData = () => [
  { hour: "0 am", messagesDelivered: 5500, messagesSent: 6000 },
  { hour: "1 am", messagesDelivered: 5800, messagesSent: 6500 },
  { hour: "2 am", messagesDelivered: 6900, messagesSent: 7800 },
  { hour: "3 am", messagesDelivered: 6600, messagesSent: 7000 },
  { hour: "4 am", messagesDelivered: 4050, messagesSent: 6080 },
  { hour: "5 am", messagesDelivered: 6750, messagesSent: 7100 },
  { hour: "6 am", messagesDelivered: 6600, messagesSent: 7200 },
  { hour: "7 am", messagesDelivered: 6600, messagesSent: 7400 },
  { hour: "8 am", messagesDelivered: 7100, messagesSent: 7500 },
  { hour: "9 am", messagesDelivered: 7200, messagesSent: 7600 },
  { hour: "10 am", messagesDelivered: 4500, messagesSent: 4900 },
  { hour: "11 am", messagesDelivered: 6250, messagesSent: 7800 },
  { hour: "12 pm", messagesDelivered: 6300, messagesSent: 7900 },
  { hour: "1 pm", messagesDelivered: 2400, messagesSent: 3000 },
  { hour: "2 pm", messagesDelivered: 7500, messagesSent: 8200 },
  { hour: "3 pm", messagesDelivered: 7650, messagesSent: 8000 },
  { hour: "4 pm", messagesDelivered: 7250, messagesSent: 8400 },
  { hour: "5 pm", messagesDelivered: 7600, messagesSent: 8850 },
  { hour: "6 pm", messagesDelivered: 7700, messagesSent: 8600 },
  { hour: "7 pm", messagesDelivered: 7650, messagesSent: 8700 },
  { hour: "8 pm", messagesDelivered: 7750, messagesSent: 8300 },
  { hour: "9 pm", messagesDelivered: 7800, messagesSent: 8900 },
  { hour: "10 pm", messagesDelivered: 8000, messagesSent: 9000 },
  { hour: "11 pm", messagesDelivered: 9050, messagesSent: 9100 },
  { hour: "12 pm", messagesDelivered: 9050, messagesSent: 9100 },
];

const WhatsApp_Chart = ({title}) => {
  const data = generateWhatsAppData( );

  return (
    <div className="chart">
        <div className="chart_title">
            <h2> {title} </h2>
          </div>
      {/* Enable horizontal scrolling by ensuring this container is scrollable */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              label={{ value: "Hour", position: "insideBottomRight", offset: -5 }}
            />
            <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
            <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="linear"
              dataKey="messagesSent"
              stroke="#4285f4"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Messages Sent"
            />
            <Line
              type="linear"
              dataKey="messagesDelivered"
              stroke="#34a853"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Messages Delivered"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default WhatsApp_Chart