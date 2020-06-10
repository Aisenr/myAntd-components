import Map from './Map';
import Markers from './Markers';
import Heatmap from './Heatmap';
import Graph from './Graph';
import Graphs from './Graphs';
import InfoWindow from './InfoWindow';
import Boundary from './Boundary';
import { getDistance } from './coordtransform';

Map.Markers = Markers;
Map.Heatmap = Heatmap;
Map.Graph = Graph;
Map.Graphs = Graphs;
Map.InfoWindow = InfoWindow;
Map.Boundary = Boundary;
Map.getDistance = getDistance;

export default Map;
