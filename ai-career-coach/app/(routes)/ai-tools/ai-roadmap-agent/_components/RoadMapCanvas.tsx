import React from 'react'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Controls, MiniMap, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TurboNode from './TurboNode';

const nodeTypes={
    turbo:TurboNode,
     input: TurboNode,
  output: TurboNode         
}

function RoadMapCanvas({initialNodes, initialEdges}: any) { 
  return (
     <div>



    </div>
  )
}

export default RoadMapCanvas
