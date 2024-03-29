<html>
   <head>
      <title>Cycle Graph Visualizer</title>

      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="GE3-GITVersion" content="3.6.1">

      <link rel="icon" type="image/png" href="./images/favicon.png"></link>
      <link rel="stylesheet" href="./style/fonts.css" type="text/css"></link>
      <link rel="stylesheet" href="./style/sliders.css" type="text/css"></link>
      <link rel="stylesheet" href="./visualizerFramework/visualizer.css" type="text/css"></link>
      <link rel="stylesheet" href="./style/SubsetHighlightController.css" type="text/css"></link>
      <link rel="stylesheet" href="./style/menu.css" type="text/css"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">

      <style>
       body {
          -webkit-user-select: none;  /* prevents confusing cut-and-paste attempt */
       }

       #graphic {
          background-color: #C8C8F0;
       }
      </style>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="./refreshVersion.js"></script>
      <script type="module">
       import {check} from './js/Migration.js'
			 import {load} from "./CycleGraph.js";
 			 window.addEventListener('load', () => check().then(load))
      </script>
   </head>
   <body>
     <div id="bodyDouble">
       <div id="header">
         <div id="heading"></div>
       </div>
       <div id="display">
         <div id="graphic">
           <template id="node-label-template">
             <div id="node-label" class="tooltip remove-on-clean">
               ${Group.representation[element]}
             </div>
           </template>
         </div>          
         <div id="controls">
           <div id="control">
             <div id="subset-control">
               <!-- This is filled in by subsetDisplay/subsets.html -->
             </div>
           </div>
         </div>
       </div>
     </div>
   </body>
</html>
