import moment from "moment";
import React from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useRecoilValue } from "recoil";
import { getAllChartData } from "../../recoil/Atoms";

const Linechart = () => {
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
          week: obj?.month,
          date: moment(obj?._id).format("DD-MM-YYYY"),
        };
      });
    } else if (visitorData?.chartDataStatus === "monthly") {
      data = visitorData?.visitorData?.map((obj) => {
        return {
          month: obj?.month,
          visitas: obj?.count,
          week: capitalizeFirstLetter(obj?.sortWeek),
          tooltipWeek: capitalizeFirstLetter(obj?.sortWeek),
          date: moment(obj?._id).format("DD-MM-YYYY"),
        };
      });
    } else if (visitorData?.chartDataStatus === "week") {
      data = visitorData?.visitorData?.map((obj) => {
        return {
          month: obj?.month,
          visitas: obj?.count,
          week: obj?.sortWeek,
          date: moment(obj?._id).format("DD-MM-YYYY"),
        };
      });
    } else {
      if (visitorData?.visitorData?.length <= 30) {
        // data = visitorData?.visitorData?.map((obj) => {
        // 	return {
        // 		month: obj?.month,
        // 		visitas: obj?.count,
        // 		week: obj?.sortWeek,
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
            return {
              weekStart: getWeekStart(group[0]._id),
              week: capitalizeFirstLetter(group[0]?.sortWeek),
              visitas: group.reduce(function (acc, item) {
                return acc + item.count;
              }, 0),
            };
          });
        }

        // console.log("fdsf", groupWeeks(visitorData?.visitorData));
        data = groupWeeks(visitorData?.visitorData).filter(function (el) {
          return el != null;
        });
        // console.log("30");
        // console.log("data ::;: 30 ", data);
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

        // console.log("fdsf", groupWeeks(visitorData?.visitorData));
        data = groupWeeks(visitorData?.visitorData).filter(function (el) {
          return el != null;
        });
        // console.log("60");
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
            return {
              week: moment(getMonthStart(group[0]._id)).format("DD-MM-YYYY"),
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

  // console.log("organizedTransactions", organizedTransactions);
  // console.log("visitorLineChart", data);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div>
            {payload.map((pld) => (
              <div
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
                  {`${pld.value} ${pld.dataKey}  `}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={220}>
        {/* <LineChart data={data} width={100} height={100}> */}
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="visitas"
            stroke={
              visitorData?.growth?.visitorIndication === "increment"
                ? "#58A43D"
                : "#A43D3D"
            }
            strokeWidth={3}
            r={false}
            activeDot={{ r: 8 }}
            offset={20}
          ></Line>
          <XAxis tick={false} axisLine={false}>
            {/* <Label
							value={visitorData?.growth?.visitor}
							offset={0}
							position='insideBottom'>
						</Label> */}
          </XAxis>

          <Tooltip
            cursor={false}
            itemStyle={{ color: "#1A1D1F", fontWeight: "bold" }}
            labelStyle={{ fontWeight: "lighter", color: "#6F767E" }}
            contentStyle={{
              border: "none",
              borderRadius: "10px",
              boxShadow: "rgba(238, 238, 239, 1) 0px 8px 30px 5px",
            }}
            content={<CustomTooltip />}
          ></Tooltip>
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default Linechart;
