import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const NAVBAR_SEGMENT_DEFAULTS = {
  alignments: tuple("start", "end"),
};

export interface NavbarSegmentVariablesOverrides {}

export interface NavbarSegmentVariablesDefaults {
  alignments: (typeof NAVBAR_SEGMENT_DEFAULTS["alignments"])[number];
}

export type NavbarSegmentVariables = Prefer<
  NavbarSegmentVariablesOverrides,
  NavbarSegmentVariablesDefaults
>;

export type NavbarSegmentModifierProps = {
  align: NavbarSegmentVariables["alignments"];
};

export type NavbarSegmentOwnProps = HelpersProps & NavbarSegmentModifierProps;
export type NavbarSegmentForwardsProps = { className: string };

export const NavbarSegment = forwardRefAs<
  "div",
  NavbarSegmentOwnProps,
  NavbarSegmentForwardsProps
>(
  ({ align, className, ...rest }, ref) => (
    <Generic
      className={classNames(
        {
          [`navbar-${align}`]: align,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

NavbarSegment.displayName = "Navbar.Segment";
NavbarSegment.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
