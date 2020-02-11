import React from "react";
import { Switch } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";


/**
 * This component is used to control the routing animation.
 * It controls what should happen after animation complete (onRest).
 * It differs animation direction based on routePopped props. (Set in router.action.js and available from routerReducer).
 * @param location React router location used as key in Switch
 * @param children All routes (set in Routes.js)
 * @param routePopped Used to manage direction of animation
 * @param rest All other props sent down
 */
export const AnimatedSwitch = ({ history, location, children, ...rest }) => {
  const reverse = location.pathname === "/";

  return (
    <PoseGroup
      style={{height: '100%'}}
      flipMove={false}
      preEnterPose={reverse ? "leftSide" : "rightSide"}
      exitPose={reverse ? "rightSide" : "leftSide"}
    >
      <ContextRouteAnimation key={location.pathname} reverse={reverse}>
        <Switch location={location} {...rest}>
          {children}
        </Switch>
      </ContextRouteAnimation>
    </PoseGroup>
  );
};

export default AnimatedSwitch;


/**
 * Try to change up the different commented values for varying animatmions
 */
export const ContextRouteAnimation = posed.div({
  enter: {
    x: 0,
    // opacity: 1,
    // scale: 1,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 400
    }
  },
  leftSide: {
    x: "-100%",
    // opacity: 0,
    // scale: 1.5,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 400
    }
  },
  rightSide: {
    x: "100%",
    // opacity: 0,
    // scale: 1.5,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 400
    }
  }
});