---
layout: panel
title: Project 1
permalink: /projects/project1/
---

{% include return.html %}

# 3-Link Robot Arm Path Planning & Manipulability Analysis  
*A* Algorithm + Workspace Manipulability Ellipsoid | Ritsumeikan University*

<hr/>

## Introduction  
Modern robotic manipulators must navigate complex workspaces while respecting joint limits, avoiding obstacles, and maintaining dexterous control. In this project, we focus on a simplified 3-link planar arm to investigate how inverse kinematics and heuristic search can be combined to produce smooth, efficient end-effector trajectories. By marrying the A* algorithm’s path-finding strengths with manipulability metrics from the Jacobian, we aim to find joint motions that not only reach the target but also favor poses of high control “comfort.”

<hr/>

## Project Background  
Traditional IK solvers compute a single joint configuration for a given end-effector pose, but generating an entire trajectory (a sequence of poses) introduces new challenges:  
- **Redundancy:** multiple joint solutions exist at each step, leading to discontinuous jumps if naively chained.  
- **Joint limits & workspace constraints:** physical link lengths and angle bounds carve out a non-convex reachable region.  
- **Manipulability:** some configurations offer better force/velocity transmission, reducing singularity risks.  

To address these, we implemented a grid-based A* search over discretized joint angles, enriched with manipulability ellipsoid volume as a tie-breaker. This allowed us to plan full trajectories that smoothly guide the arm from start to goal while maximizing dexterity.

<hr/>

## Problem Statement  
How can we generate a collision-free, smooth joint trajectory for a 3-link robotic arm that:  
1. Navigates around joint‐limit and workspace constraints,  
2. Minimizes cumulative end-effector error to the goal, and  
3. Prefers configurations of high manipulability to ensure reliable control?  

In other words, we seek an algorithm that not only finds a path in joint-space but also yields poses that keep the robot in its best working envelope throughout the motion.  

## Coordinate Definitions  
We define joint angles as:  
- **θ₁ (Yaw):** rotation about base Z-axis in the X–Y plane  
- **θ₂ (Pitch 1):** elevation of link 2 relative to link 1 endpoint  
- **θ₃ (Pitch 2):** elevation of link 3 relative to link 2 endpoint 

## Introduction  
Milling removes material via rotary cutters—used for grooving, boring, drilling, etc.  
Without proper guarding, operators risk injuries from flying chips or entanglement.

<hr/>

## Project Background  
- Between 1992–2010, machinery accidents caused 14,625 deaths (avg. 770/year).  
- Many conventional milling machines lack safety covers, exposing operators to hazards.

<figure>
  <img src="{{ '/assets/Picture8.png' | relative_url }}" alt="Mobile and stationary machine accidents" />
  <figcaption>Figure: Accident statistics for mobile vs. stationary machinery</figcaption>
</figure>

<hr/>

## Problem Statement  
- **Sharp metal chips** can fly off and injure the operator.  
- **No barrier** separates the operator from the rotating blade.  
- **Lack of maintenance** increases risk over time.

<hr/>

## Objectives  
1. **Identify & analyze** hazards of horizontal milling machines.  
2. **Design** a durable, easy‐to‐install safety cover that does not impede operation.  
3. **Evaluate** cover effectiveness through testing and simulation.  
4. **Promote** safety cover use as best practice in industry.

<hr/>

## Coordinate Definitions  
We define joint angles as:  
- **θ₁ (Yaw):** rotation about base Z-axis in the X–Y plane  
- **θ₂ (Pitch 1):** elevation of link 2 relative to link 1 endpoint  
- **θ₃ (Pitch 2):** elevation of link 3 relative to link 2 endpoint

<hr/>

## Joint Workspace Visualization  
Each joint’s range is limited to [0°, 120°] in 1° increments. Below is the combined reachable workspace projected onto the X–Y plane:

<figure>
  <img src="{{ '/assets/Picture16.jpg' | relative_url }}" alt="Movement Range" />
  <figcaption>Movement Range</figcaption>
</figure>

<hr/>

## Cost Function & Heuristic  
We use A* with:  
- **g(n):** cumulative end-effector error ∑‖FK(qₖ)–Goal‖ over visited nodes  
- **h(n):** Euclidean distance from current EE position to target  

Together f(n)=g(n)+h(n) balances past error vs. proximity, efficiently guiding search toward the goal.

As a secondary criterion, we compute the manipulability ellipsoid volume  
π·σ₁·σ₂·σ₃ (from the Jacobian’s singular values),  
so that among equal-cost paths we prefer postures with higher control “comfort.”

<hr/>

## Search Methods Compared  
- **Dijkstra’s Algorithm:** exhaustive, finds optimal path but explores entire space → slow  
- **A* Algorithm:** uses h(n) for pruning → finds the same‐quality solution significantly faster
  
<hr/>

## A* Search Procedure  
1. **Initialization:** start node at (θ₁,θ₂,θ₃) = (45°,45°,45°)  
2. **Expansion:** from current node, generate neighbors by ±1° on each joint  
3. **Cost update:** compute g, h, and f for each neighbor  
4. **Priority Queue:** always expand the node with lowest f(n)  
5. **Termination:** stop once a solution within tolerance is found
   
<hr/>

## Program Structure  
- **config.py:** defines link lengths L₁=L₂=L₃=1.0, joint limits, STEP_DEG, START, GOAL, GOAL_TOL  
- **kinematics.py:** forward kinematics FK(q) → (x,y,z); computes Jacobian J(q) & manipulability σ’s  
- **search.py:** implements A*, uses f=g+h, stops when ‖FK–Goal‖<GOAL_TOL  
- **visualization.py:**  
  - 3D animation of all candidate paths (color-coded)  
  - 3D replay of the best‐found path  
  - 2D XY projection of EE trajectory + manipulability ellipsoids  
  - Error‐vs‐iteration plot  
  - Joint‐limit visualization

<hr/>

## Results  
- **All Solutions Viz:** color lines show every path tested; best path highlighted  
- **Best Path Animation:** shows EE moving from start (green ●) to goal (red ★)  
- **Error Graph:** error g(n) decreasing over iterations  
- **2D Trajectory Plot:** shows nearly straight path, detouring through high-manipulability zones  
- **Manipulability Ellipsoids:** plotted at key waypoints to illustrate control “comfort”

<figure>
  <img src="{{ '/assets/Picture18.jpg' | relative_url }}" alt="Error along Best Trajectory" />
  <figcaption>Error along Best Trajectory</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/Picture18.jpg' | relative_url }}" alt="Error along Best Trajectory" />
  <figcaption>Error along Best Trajectory</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/Picture19.jpg' | relative_url }}" alt="XY Projection along Best Trajectory" />
  <figcaption>XY Projection along Best Trajectory</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/Picture20.jpg' | relative_url }}" alt="Final pose and EE Manipulability Ellipses" />
  <figcaption>Final pose and EE Manipulability Ellipses</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/Picture21.jpg' | relative_url }}" alt="Normalized Planar Manipulability Ellipses" />
  <figcaption>Normalized Planar Manipulability Ellipses</figcaption>
</figure>

<hr/>

## Demo Video  
<video controls style="max-width:100%;margin:1rem 0;">
  <source src="{{ '/assets/Media4.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

<hr/>

## Final Outcomes  
- **Objective 1:** Identified key hazards of unguarded milling machines.  
- **Objective 2:** Created a cover that does not interfere with machine operation.  
- **Objective 3:** Demonstrated chip containment and reduced floor debris.

<hr/>

<hr/>


## Discussion & Future Work  
THe A* implementation found optimal joint sequences in a fraction of the time required by Dijkstra, while the manipulability metric effectively steered the arm through more controllable postures.  
**Next steps:** integrate continuous-space IK solvers, incorporate torque constraints, and port the planning onto embedded hardware for real-time onboard execution.


<hr/>
<footer class="project-footer">
  <a href="/"               class="btn btn-home"> Home</a>
  <a href="/projects/project2" class="btn btn-next">Next →</a>
</footer>
