import * as React from "react";

function FrameFFsvg(props: any) {
  return (
    <svg height={ 290 } width={ 250 } viewBox="-57 255.945 250 290" { ...props } transform="scale(3)">
      <g fill="#FFF">
        <path d="M76.36 530.81h100.75l14.75 15.14h-248l14.75-15.14H67.86zM191.86 255.95l-14.75 14.86h-218.5l-14.75-14.86h124z" />
        <path d="M191.86 255.95v290l-14.75-15.14v-260zM177.11 270.81v260H76.36v-260zM76.36 270.81v260h-17v-260h8.5zM59.36 270.81v260H-41.39v-260zM-41.39 270.81v260l-14.75 15.14v-290z" />
      </g>
      <g fill="none" stroke="#231F20" strokeWidth={ 2 } strokeLinejoin="round">
        <path d="M59.36 270.81v.5M-56.14 545.95v-290M-41.39 530.81l-14.75 15.14M-41.39 270.81l-14.75-14.86M67.86 530.81H-41.39v-260M-41.39 270.81H67.86M59.36 271.31v260M76.36 271.31v-.5M191.86 255.95v290M-56.14 255.95h248M-56.14 545.95h248l-14.75-15.14M191.86 255.95l-14.75 14.86M177.11 270.81v260H67.86M67.86 270.81h109.25M76.36 531.31v-260" />
      </g>
    </svg>
  );
}

const MemoFrameFFsvg = React.memo(FrameFFsvg);
export default MemoFrameFFsvg;
