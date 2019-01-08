import { COLORS } from "src/base/helpers/variables";
import {
  Input,
  INPUT_SIZES,
  INPUT_STATES,
  INPUT_TYPES,
} from "src/elements/form/input";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = Input;
const COMPONENT_NAME = "Input";
const DEFAULT_ELEMENT = "input";
const BULMA_CLASS_NAME = "input";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("color", () => {
      validateOneOfPropType(propTypes, "color", COLORS);

      COLORS.map(color => {
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("readOnly", () => {
      validateBoolPropType(propTypes, "readOnly");

      [false, true].map(readOnly => {
        it(`should ${readOnly ? "" : "not "}be readOnly`, () => {
          const node = makeNode({ readOnly });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.prop("readOnly")).toBe(readOnly);
        });
      });
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = makeNode({ rounded });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", INPUT_SIZES);

      INPUT_SIZES.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("state", () => {
      validateOneOfPropType(propTypes, "state", INPUT_STATES);

      INPUT_STATES.map(state => {
        it(`should be ${state}`, () => {
          const node = makeNode({ state });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${state}`)).toBe(true);
        });
      });
    });

    describe("static", () => {
      validateBoolPropType(propTypes, "static");

      [false, true].map(isStatic => {
        it(`should ${isStatic ? "" : "not "}be static`, () => {
          const node = makeNode({ static: isStatic });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-static")).toBe(isStatic);
          expect(wrapper.prop("readOnly")).toBe(isStatic);
        });
      });
    });

    describe("type", () => {
      validateOneOfPropType(propTypes, "type", INPUT_TYPES);

      INPUT_TYPES.map(isType => {
        it(`should be ${isType}`, () => {
          const node = makeNode({ type: isType });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(
            (wrapper.props() as React.InputHTMLAttributes<Element>).type,
          ).toEqual(isType);
        });
      });
    });
  });
});
