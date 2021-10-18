import { useState } from 'react';
import { connect } from 'react-redux';

import {
   XYPlot,
   XAxis,
   YAxis,
   VerticalGridLines,
   HorizontalGridLines,
   VerticalBarSeries,
   VerticalBarSeriesCanvas,
   LabelSeries,
} from 'react-vis';
import { Container } from 'reactstrap';


const greenData = [
   { x: 'A', y: 10 },
   { x: 'B', y: 5 },
   { x: 'C', y: 15 },
];


const labelData = greenData.map((d, idx) => ({
   x: d.x,
   y: Math.max(greenData[idx].y),
}));



const Charts = ({ count }) => {
   // const _data = count.category_id['0'];


   const [useCanvas, setUseCanvas] = useState(false);
   const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
   const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

   return (
      <Container>
         <p>{count&&count.category_id['0'].name['🍑 Friute']}</p>
         <XYPlot xType="ordinal" width={400} height={200} xDistance={100}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />

            <YAxis />
            <BarSeries className="vertical-bar-series-example" data={greenData} />
            
            <LabelSeries data={labelData} getLabel={d => d.x} />
         </XYPlot>
      </Container>
   );
};

const mapStateToProps = (state) => ({
   count: state.item.count
})

export default connect(mapStateToProps,null) (Charts);
