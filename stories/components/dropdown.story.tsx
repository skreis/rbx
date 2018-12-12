import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { action } from "@storybook/addon-actions";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Dropdown } from "@/components";
import { DROPDOWN_ALIGNMENTS } from "@/components/dropdown/dropdown";
import { Button, Icon } from "@/elements";
import { Section } from "@/layout";

import { iterableToSelectObject } from "../helpers";

export const knobs = {
  active: (title: string = "Active") =>
    select(
      title,
      {
        "false (when managed)": "false",
        "true (when managed)": "true",
        undefined: "",
      },
      "",
    ),
  align: (title: string = "Align") =>
    select(
      title,
      iterableToSelectObject(DROPDOWN_ALIGNMENTS, { undefined: "" }),
      "",
    ),
  hoverable: (title: string = "Hoverable") => boolean(title, false),
  managed: (title: string = "Managed") => boolean(title, false),
  up: (title: string = "Up") => boolean(title, false),
};

storiesOf("Components/Dropdown", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const { align, active, ...rest } = {
      active: knobs.active() as string,
      align: knobs.align(),
      hoverable: knobs.hoverable(),
      managed: knobs.managed(),
      up: knobs.up(),
    };

    return (
      <div
        style={{
          marginLeft: align !== "" ? "54px" : 0,
          marginTop: rest.up ? "200px" : 0,
        }}
      >
        <Dropdown
          active={
            active === "true" ? true : active === "false" ? false : undefined
          }
          align={align || undefined}
          {...rest}
        >
          <Dropdown.Trigger>
            <Button>
              <span>{rest.up ? "Dropup" : "Dropdown"} button</span>
              <Icon size="small">
                <FontAwesomeIcon icon={rest.up ? faAngleUp : faAngleDown} />
              </Icon>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Content>
              <Dropdown.Item>Dropdown item</Dropdown.Item>
              <Dropdown.Item>Other dropdown item</Dropdown.Item>
              <Dropdown.Item active>Active dropdown item</Dropdown.Item>
              <Dropdown.Item>Other dropdown item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>With a divider</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  })
  .add("Controlled", () => {
    interface State {
      selected: string | null;
    }
    interface Props {
      items: string[];
      onChange?: (name: string) => void;
    }
    class ControlledDropdown extends React.PureComponent<Props, State> {
      public readonly state: State = { selected: null };
      public render() {
        const selected = this.state.selected || this.props.items[0];
        return (
          <Dropdown>
            <Dropdown.Trigger>
              <Button>
                <span>{selected}</span>
                <Icon size="small">
                  <FontAwesomeIcon icon={faAngleDown} />
                </Icon>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Content>
                {this.props.items.map(item => (
                  <Dropdown.Item
                    active={item === selected}
                    onClick={() => this.setSelected(item)}
                  >
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown.Menu>
          </Dropdown>
        );
      }
      private setSelected(name: string) {
        this.setState({ selected: name });
        if (this.props.onChange) {
          this.props.onChange(name);
        }
      }
    }

    return (
      <ControlledDropdown
        onChange={action("onChange called")}
        items={[
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
        ]}
      />
    );
  });