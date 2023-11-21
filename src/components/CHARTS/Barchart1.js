import moment from "moment";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useRecoilValue } from "recoil";
import { getAllChartData } from "../../recoil/Atoms";

function BarChartCounter() {
  const [focusBar, setFocusBar] = useState(null);
  const visitorData = useRecoilValue(getAllChartData);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  let data;
  const getData = () => {
    if (visitorData?.chartDataStatus === "yearly") {
      data = visitorData?.visitorData?.map((obj) => {
        return {
          month: obj?.month,
          visitas: obj?.count,
          week: capitalizeFirstLetter(obj?.month),
          date: moment(obj?._id).format("DD-MM-YYYY"),
        };
      });
    } else if (visitorData?.chartDataStatus === "monthly") {
      data = visitorData?.visitorData?.map((obj) => {
        return {
          month: capitalizeFirstLetter(obj?.month),
          visitas: obj?.count,
          week: capitalizeFirstLetter(obj?.sortWeek?.charAt(0)),
          tooltipWeek: capitalizeFirstLetter(obj?.sortWeek),
          date: moment(obj?._id).format("DD-MM-YYYY"),
        };
      });
    } else if (visitorData?.chartDataStatus === "week") {
      data = visitorData?.visitorData?.map((obj) => {
        return {
          month: obj?.month,
          visitas: obj?.count,
          week: capitalizeFirstLetter(obj?.sortWeek),
          date: moment(obj?._id).format("DD-MM-YYYY"),
        };
      });
    } else {
      if (visitorData?.visitorData?.length <= 30) {
        // data = visitorData?.visitorData?.map((obj) => {
        // 	return {
        // 		month: obj?.month,
        // 		visitas: obj?.count,
        // 		week: capitalizeFirstLetter(obj?.sortWeek?.charAt(0)),
        // 	tooltipWeek: capitalizeFirstLetter(obj?.sortWeek),
        // 		date: moment(obj?._id).format("DD-MM-YYYY"),
        // 	};
        // });
        function getWeekStart(date) {
          var offset = new Date(date).getDay();

          return new Date(new Date(date) - offset * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
        }

        function groupWeeks(dates) {
          const groupsByWeekNumber = dates.reduce(function (acc, item) {
            const today = new Date(item._id);
            const weekNumber = today.getWeek();

            // check if the week number exists
            if (typeof acc[weekNumber] === "undefined") {
              acc[weekNumber] = [];
            }

            acc[weekNumber].push(item);

            return acc;
          }, []);

          return groupsByWeekNumber.map(function (group) {
            // console.log("group", group);
            return {
              weekStart: getWeekStart(group[0]._id),
              week: capitalizeFirstLetter(group[0]?.sortWeek),
              visitas: group.reduce(function (acc, item) {
                return acc + item.count;
              }, 0),
            };
          });
        }

        data = groupWeeks(visitorData?.visitorData).filter(function (el) {
          return el != null;
        });
      } else if (
        visitorData?.visitorData?.length >= 30 &&
        visitorData?.visitorData?.length <= 60
      ) {
        function getWeekStart(date) {
          var offset = new Date(date).getDay();

          return new Date(new Date(date) - offset * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
        }

        function groupWeeks(dates) {
          const groupsByWeekNumber = dates.reduce(function (acc, item) {
            const today = new Date(item._id);
            const weekNumber = today.getWeek();

            // check if the week number exists
            if (typeof acc[weekNumber] === "undefined") {
              acc[weekNumber] = [];
            }

            acc[weekNumber].push(item);

            return acc;
          }, []);

          return groupsByWeekNumber.map(function (group) {
            return {
              weekStart: getWeekStart(group[0]._id),
              visitas: group.reduce(function (acc, item) {
                return acc + item.count;
              }, 0),
            };
          });
        }

        data = groupWeeks(visitorData?.visitorData).filter(function (el) {
          return el != null;
        });
      } else {
        // console.log("60+");
        function getMonthStart(date) {
          var offset = new Date(date).getMonth();
          return new Date(new Date(date) - offset);
        }

        function groupMonths(dates) {
          const groupsByMonthNumber = dates?.reduce(function (acc, item) {
            const today = new Date(item._id);
            const monthNumber = today.getMonth();

            // check if the week number exists
            if (typeof acc[monthNumber] === "undefined") {
              acc[monthNumber] = [];
            }

            acc[monthNumber].push(item);

            return acc;
          }, []);

          return groupsByMonthNumber?.map(function (group) {
            // console.log("group", group);
            return {
              week: moment(getMonthStart(group[0]._id)).format("DD-MM-YYYY"),
              month: group?.month,
              // week: group?.month,
              visitas: group.reduce(function (acc, item) {
                return acc + item.count;
              }, 0),
            };
          });
        }
        data = groupMonths(visitorData?.visitorData)?.filter(function (el) {
          return el != null;
        });
      }
    }
  };
  getData();

  const CustomTooltip = ({ active, payload, label }) => {
    // console.log("payload", payload);
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div>
            {payload.map((pld) => (
              <div
                div
                style={{
                  display: "inline-block",
                  padding: 10,
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div style={{ color: "#6F767E" }}>
                  {pld?.payload?.week?.length === 1
                    ? pld?.payload?.tooltipWeek
                    : pld?.payload?.week}

                  <br />
                  {pld.payload.date}
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    color: "#1A1D1F",
                  }}
                >
                  {" "}
                  {`${pld.value} ${pld.dataKey}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };
  // console.log("data", data);
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        onMouseMove={(state) => {
          if (state.isTooltipActive) {
            setFocusBar(state.activeTooltipIndex);
            // setmouseOver(false);
          } else {
            setFocusBar(null);
            // setmouseOver(true);
          }
        }}
      >
        <XAxis
          dataKey="week"
          axisLine={false}
          tickMargin="10"
          tickLine={false}
          interval={0}
        />

        <Tooltip
          cursor={false}
          itemStyle={{ color: "#1A1D1F", fontWeight: "bolder" }}
          labelStyle={{ fontWeight: "normal", color: "#6F767E" }}
          contentStyle={{
            border: "none",
            borderRadius: "10px",
            boxShadow: "0px, 4px,rgba(0, 0, 0, 0.15)",
          }}
          content={<CustomTooltip />}
        />

        <Bar dataKey="visitas" radius={5}>
          {data?.map((entry, index) => (
            <Cell
              fill={focusBar === index ? "#0068FF" : "rgba(0, 102, 255,50%)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartCounter;
