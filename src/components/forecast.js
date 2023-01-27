import React, { Fragment } from 'react'
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion'
import ForecastDaily from './forecast-daily';
import './forecast.css';

const Forecast = ({ data }) => {

  // Accepts the array and key
  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      const newKey = currentValue[key].split(' ', 1);
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[newKey] = result[newKey] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  const convertDateToName = (forecastDate) => {
    const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    const date = new Date(forecastDate);
    const day = date.getDay();
    return daylist[day];
  }

  const dataGroupedByDate = groupBy(data.list, 'dt_txt');


  return (
    <>
      <h1 className="title">5-days forecast</h1>
      <Accordion allowZeroExpanded>
        {Object.keys(dataGroupedByDate).map((forecastDate) => {
          return (
            <AccordionItem key={forecastDate} >
              <AccordionItemHeading>
                <AccordionItemButton >
                  <div className="daily-item">
                    <p className='item-date-name'>{convertDateToName(forecastDate)}</p>
                    <p className='item-date'>{forecastDate}</p>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel >
                <div className='forecast '>
                  {dataGroupedByDate[forecastDate].map((data, id) => {
                    return (
                      <Fragment key={id}>
                        <ForecastDaily data={data} />
                      </Fragment>
                    )
                  }
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </>
  )
}

export default Forecast
