---
layout: panel
title: Project 2
permalink: /projects/project2/
---

{% include return.html %}

# Ping Pong Robot  
*Robot Creation Experiment, Ritsumeikan University*

<hr/>

## Introduction  
A single–player ping-pong robot designed to track and return balls autonomously using computer vision and precise actuation.

<hr/>

## Project Background  
In the Robot Creation Experiment course, we built a fully autonomous ping-pong robot inspired by Omron’s design. The goal was to let a single player practice rallying against a machine—no human partner required. We optimized for senior users by including an adjustable difficulty function (Easy ↔ Hard) and designed it compactly for potential arcade installation.

<figure>
  <img src="{{ '/assets/c1010.jpg' | relative_url }}" alt="Omron Ping Pong Robot" />
  <figcaption>Figure: Omron Ping Pong Robot</figcaption>
</figure>

<hr/>

## Problem Statement  
Home practice for table tennis is limited by the need for a human partner, and existing single-player machines are bulky, expensive, or lack adjustable difficulty. We aimed to create a cost-effective, compact robot that can track and return balls at variable speeds, suitable for both seniors and casual players.

<hr/>

## Objectives  
From the course brief, our deliverables were:  
1. **Design** a mechanical system for precise two-axis paddle movement.  
2. **Develop** the electronic circuit to drive motors based on computed trajectories.  
3. **Implement** a control algorithm (vision + feedback) for real-time ball tracking and return.  
4. **Demonstrate** functional robot performance through live ball tracking and rally tests.
   
<hr/>

## Materials & Mechanics  
- **Vertical Movement:** GT2 timing belt  
  - Precise position control  
  - High-speed rally compatibility  
  - Durable under continuous operation  
- **Horizontal Movement:** Rack & pinion  
  - Accurate linear positioning  
  - High rigidity and durability  

<hr/>

## Design  

**Initial vs. Final Build**  
<figure>
  <img src="{{ '/assets/Picture11.jpg' | relative_url }}" alt="Initial Design" />
  <figcaption>Initial Design</figcaption>
</figure>
  <figure>
  <img src="{{ '/assets/Picture12.jpg' | relative_url }}" alt="FInal Design" />
  <figcaption>Final Design</figcaption>
</figure>

**Vertical axis:** GT2 timing belt drive  
- Provides precise, backlash-free positioning  
- High durability for continuous rallies  
- Smooth operation compatible with high-speed ball returns  

**Horizontal axis:** Rack & pinion  
- High rigidity under lateral loads  
- Accurate linear motion for consistent returns
  
<hr/>

## Circuit
Created the drawing of the circuit in Tinkercad
<figure>
  <img src="{{ '/assets/Picture14.jpg' | relative_url }}" alt="Circuit" />
  <figcaption>Circuit</figcaption>
</figure>

<hr/>

## Control  
We split processing between a PC (vision & trajectory calculation) and the Arduino (motor actuation & PID loop).  

1. **Feedback Control Loop**  
   - PC captures webcam frames, extracts ball color coordinates, corrects lens distortion, and converts pixels → millimeters.  
   - Predicted impact point is sent via serial to Arduino.  
   - Arduino runs a PID loop to move the paddle to the target coordinates.
     
<figure>
  <img src="{{ '/assets/abc.png' | relative_url }}" alt="Feedback Control" />
  <figcaption>Feedback Control</figcaption>
</figure>

2. **Trajectory Prediction**  
   - Two-point linear extrapolation estimates where the ball will intersect the paddle plane.  
   - Calculation performed in MATLAB at ~30 Hz, ensuring real-time responsiveness. 
  <figure>
  <img src="{{ '/assets/cde.png' | relative_url }}" alt="Ball Trajectory Tracking" />
  <figcaption>Ball Trajectory Tracking</figcaption>
</figure>
2. **Mathematical Equation**  
   - Below is the mathematical equation for the program.  
  <figure>
  <img src="{{ '/assets/wasd.png' | relative_url }}" alt="Mathematical Equation" />
  <figcaption>Mathematical Equation</figcaption>
</figure>

<hr/>

## Demo Video  

**Ball Tracking Program**
<video controls style="max-width:100%;margin:1rem 0;">
  <source src="{{ '/assets/Media3.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

**Robot Movement**
<video controls style="max-width:100%;margin:1rem 0;">
  <source src="{{ '/assets/Media2.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>
## Results  
In live tests, the robot tracked and returned balls tossed successfully
<figure>
  <img src="{{ '/assets/Picture13.jpg' | relative_url }}" alt="Ping Pong Robot" />
  <figcaption>Ping Pong Robot</figcaption>
</figure>

<hr/>

## Conclusions  
- **Mechanical design** (belt & rack) provided robust, repeatable motion.  
- **Electronic prototyping** on perf board allowed quick iterations.  
- **Hybrid control** (PC + Arduino) achieved real-time performance suitable for casual play

<hr/>

## Future Work  
- **Modularize** mechanical assemblies for faster build times.  
- **Offload** trajectory computation to embedded processors to remove PC dependency.  
- **Design** a custom PCB to replace universal perf-board for production readiness.

<hr/>

<footer class="project-footer">
  <a href="/projects/project1/" class="btn btn-prev">← Previous</a>
  <a href="/"                   class="btn btn-home">Home</a>
  <a href="/projects/project3/" class="btn btn-next">Next →</a>
</footer>
