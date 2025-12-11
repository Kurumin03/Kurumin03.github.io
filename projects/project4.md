---
layout: panel
title: Automated Docking Approach Phase for UR5e Robot using YOLOv8
permalink: /projects/project3/
---

{% include return.html %}

<div style="display:flex;align-items:center;gap:1rem">
  <h1 style="margin:0">AUTOMATED DOCKING APPROACH PHASE FOR UR5E ROBOT USING YOLOV8</h1>
  <span style="background:#ff6f61;color:#fff;padding:0.25rem 0.6rem;border-radius:6px;font-weight:700;font-size:0.9rem">ONGOING</span>
</div>

*Research paper for degree — Ritsumeikan University*

<hr/>

## Introduction  
Automated docking enables a robotic manipulator to locate, approach and align with a docking fixture (for tool-change, charging, or precise pick-and-place). This project focuses on the **approach phase** using an eye-in-hand camera and YOLOv8 for detection, converting detections to 3D goals, solving IK with MoveIt, and executing the approach on a UR5e. Currently everything is validated in simulation; moving the real UR5e is actively being worked on.

<hr/>

## Problem Statement  
In our lab the docking robot (Hyblock) currently **requires manual docking** — a human must position the module and perform the precise alignment. Manual docking is time-consuming, inconsistent and limits throughput. The goal of this research is to automate the docking approach so the Hyblock docking process becomes repeatable, faster and requires less human intervention while maintaining safety.

<hr/>

## Objectives  
1. **Automate the docking approach** so the UR5e can detect the docking module and approach it without manual guidance.  
2. **Reduce human workload** by replacing manual alignment steps with a perception + motion pipeline.  
3. **Ensure safety & repeatability**: create conservative approach trajectories and logging so operations can be reviewed and validated.  
4. **Prototype in simulation** and prepare the codebase, calibration steps and safety checks needed to transition to the real UR5e.

<hr/>

## System Overview (high-level)  
- **Perception:** YOLOv8 detects the docking module from an eye-in-hand camera.  
- **Coordinate flow:** detection → 3D point (via depth/PnP) → TF transform → `PoseStamped` in planning frame.  
- **Motion:** MoveIt IK service computes joint solution → trajectory created → `FollowJointTrajectory` action sent to controller.  
- **Safety:** retries, timeouts, logging and conservative approach distances prevent unsafe motions.

<figure>
  <img src="{{ '/assets/Picture8.png' | relative_url }}" alt="System overview: camera → detection → transform → IK → controller" />
  <figcaption>Figure: High-level system architecture (perception → transform → IK → execution)</figcaption>
</figure>

<hr/>

## Methodology / Workflow (detailed)  
1. **YOLOv8 training & inference**  
   - Collect images of the docking module; annotate and train YOLOv8 to detect the docking_module class.  
   - Inference node publishes detections (bounding box + score). Use camera depth or stereo / PnP to estimate 3D coordinates.

2. **Detection → 3D coordinate**  
   - Convert bounding-box centroid + depth (or PnP with known markers) into a `PointStamped` or write to a small CSV for reproducible demos. The CSV approach also acts as a simple shared state for notebook/CLI experiments.

3. **CSV/Point watcher**  
   - `csv_watcher` / `auto_move_from_csv` read detections and publish `geometry_msgs/PoseStamped` to `/ur5e_move_goal` (transient_local QoS for robustness to late subscribers).

4. **Target handler**  
   - `target_handler` attempts TF transformation of incoming points into the chosen planning frame (world/base). If MoveIt is available it can hand the pose directly to MoveIt; otherwise it publishes the fallback goal for `move_executor`.

5. **Move executor**  
   - Receives `PoseStamped`, transforms to `planning_frame` (e.g., `base_link_inertia`) using TF2, calls `/compute_ik` (MoveIt) with the provided robot_state (seeded by latest `/joint_states`), converts a successful IK `RobotState` into a `JointTrajectory` and sends as an action to the joint controller.

6. **Execution & logging**  
   - Action status is monitored, results logged, and failures retried with conservative backoff. All events are saved to a JSON log for offline analysis.

<hr/>

## Challenges (technical)  
- **Frame management / TF availability:** eye-in-hand setups require careful TF handling; late TF/static transforms or missing frames must be handled gracefully.  
- **IK failures / solver choice:** IK may fail for unreachable poses or when the requested ik_link is mis-specified; solver parameters and seed joint states matter.  
- **Reliable depth/pose estimation:** bounding box → 3D point conversion can be noisy; PnP + multiple views help.  
- **Safety when moving a real robot:** network setup, interlocks, hand-eye calibration, and physical guards are required before enabling the real UR5e.

<hr/>

## Codebase — files & responsibilities  
(Visitors can quickly understand what each node does.)

- **`perception/`** — YOLOv8 dataset, training scripts, inference node that publishes detections (and optionally writes CSV).  
- **`csv_watcher.py` / `auto_move_from_csv.py`** — Watch CSV and publish `PoseStamped` to `/ur5e_move_goal`. Uses transient_local QoS so late subscribers receive the last message.  
- **`target_handler.py`** — Subscribes to `PointStamped` (`object_coordinate`), attempts TF transform to `world`, logs events and either sends to MoveIt (if available) or publishes fallback pose.  
- **`move_executor.py`** — Core node: subscribes to `/ur5e_move_goal`, uses TF2 to transform the goal to `planning_frame`, calls MoveIt `/compute_ik`, constructs a `JointTrajectory` and sends it to the controller action `/joint_trajectory_controller/follow_joint_trajectory`. Handles retries, timeouts and clear logging.  
- **`auto_docking.py`** — lightweight demo node that publishes fallback `PoseStamped` when detection CSV updates exist.  
- **`urdf/`, `xacro/`** — robot description including an eye-in-hand camera (`ee_depth_camera.xacro`) that ensures appropriate TF frames (e.g., `tool0`, `ee_camera_link`, `base_link_inertia`) in simulation.  
- **`launch/`** — orchestrates simulation, MoveIt, and the above nodes in a reproducible order (used for demos).  
- **`logs/`** — JSON logs of detections and motion attempts for offline analysis.

<hr/>

## Experiment Study (simulation)  
- Performed repeated approach trials across varied docking poses in Gazebo + MoveIt.  
- Measured IK success rate, approach repeatability and detection robustness under different orientations/lighting (simulation photometric variations).

<hr/>

## Results (visuals)

<figure>
  <img src="{{ '/assets/Picture9.png' | relative_url }}" alt="Detection and approach visualization (simulation)" />
  <figcaption>Simulation screenshot: detected docking module and planned approach</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/Picture3.jpg' | relative_url }}" alt="3D view: UR5e and docking fixture" />
  <figcaption>Gazebo / MoveIt 3D view during approach</figcaption>
</figure>

<hr/>

## Demo Video  
<video controls style="max-width:100%;margin:1rem 0;">
  <source src="{{ '/assets/Media1.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

<hr/>

## Conclusions  
- The **approach phase** of automated docking is functional in simulation: detection → TF → IK → controller execution is integrated and repeatable.  
- This project is **ongoing** — moving the real UR5e is actively in progress and requires hand-eye calibration, safety checks, and real-world tuning.  
- This work is part of my research paper for a degree at **Ritsumeikan University**.

<hr/>

## Future Plans  
- Perform hand–eye calibration to refine camera→tool transforms.  
- Add PnP / multi-view pose refinement (reduce final docking error).  
- Implement real-robot safety interlocks and operator confirmation steps before autonomous movement.  
- Collect additional real-world images to improve YOLOv8 robustness and reduce sim-to-real gap.

<hr/>

## References  
- V.-T. Nguyen, P.-T. Nguyen, S.-F. Su, P. X. Tan and T.-L. Bui, "Vision-Based Pick and Place Control System for Industrial Robots Using an Eye-in-Hand Camera," *IEEE Access*, vol. 13, pp. 25127–25140, 2025. doi: 10.1109/ACCESS.2025.3536496.  
- Rahman, S.; Rony, J.H.; Uddin, J.; Samad, M.A., "Real-Time Obstacle Detection with YOLOv8 in a WSN Using UAV Aerial Photography," *J. Imaging* 2023, 9, 216. https://doi.org/10.3390/jimaging9100216.  
- Jian Liu et al., "Deep Learning-Based Object Pose Estimation: A Comprehensive Survey." (survey for pose refinement ideas)

**Keywords:** Robots; Robot kinematics; Cameras; Robot vision systems; Service robots; Calibration; Real-time systems; Accuracy; Deep learning; End effectors; Robotic arm; vision; object detection; calibration vision; robot real-time

<footer class="project-footer">
  <a href="/projects/project3/" class="btn btn-prev">← Previous</a>
  <a href="/"                   class="btn btn-home">Home</a>
</footer>

