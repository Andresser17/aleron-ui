import React from "react";
import PropTypes from "prop-types";

function ContextMenu({ palette = "primary", options, disabled }) {
  const checkmark = "&#xea10";
  return (
    <select
      className="icon-checkmark al-bg-bg al-text-text focus:al-border-focus-border al-p-2 al-rounded-sm al-shadow-md al-primary-dark"
      name="pets"
      id="pet-select"
    >
      <option dangerouslySetInnerHTML={{ __html: checkmark }} value=""></option>
      <option className="p-2" value="dog">
        Dog
      </option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  );
}
ContextMenu.propTypes = {
  options: PropTypes.object,
  palette: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ContextMenu;
