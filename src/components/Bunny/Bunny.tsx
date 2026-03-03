import React, { useMemo, useState } from "react";

type Props = {
  logoSrc: string;              // your logo PNG
  spriteMaskSrc: string;        // bunny_sprite_mask.png
  autoplay?: boolean;           // default true
  trigger?: "hover" | "click";  // default hover
  className?: string;
};

export function RabbitHoleLogoAnimated({
  logoSrc,
  spriteMaskSrc,
  autoplay = true,
  trigger = "hover",
  className,
}: Props) {
  const [play, setPlay] = useState(autoplay);

  // Re-trigger animation on click by toggling a key
  const animKey = useMemo(() => (play ? Date.now() : 0), [play]);

  const onMouseEnter = () => trigger === "hover" && setPlay(true);
  const onMouseLeave = () => trigger === "hover" && setPlay(autoplay);
  const onClick = () => trigger === "click" && setPlay(false); // reset
  const onClickUp = () => trigger === "click" && setPlay(true); // play again

  return (
    <div
      className={["rh-wrap", className].filter(Boolean).join(" ")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onClick}
      onMouseUp={onClickUp}
      onTouchStart={() => trigger === "click" && setPlay(false)}
      onTouchEnd={() => trigger === "click" && setPlay(true)}
      data-playing={play ? "true" : "false"}
      // keyboard accessibility if you want click-trigger
      tabIndex={0}
      role="img"
      aria-label="RabbitHole logo"
    >
      <img className="rh-logo" src={logoSrc} alt="" />

      {/* Hole target guide (optional): position this to match your hole center */}
      <div className="rh-holeTarget" aria-hidden="true" />

      {/* Animated bunny overlay */}
      <div
        key={animKey}
        className="rh-bunny"
        style={
          {
            ["--maskUrl" as any]: `url(${spriteMaskSrc})`,
          } as React.CSSProperties
        }
        aria-hidden="true"
      />
    </div>
  );
}