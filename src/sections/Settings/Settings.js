import React from 'react';

const Settings = () => {
  return (
    <form>
      <div>
        <input type="checkbox" id="checkbox1" />
        <label htmlFor="checkbox1">
          First checkbox
        </label>
      </div>
      <div>
        <input type="checkbox" id="checkbox2" />
        <label htmlFor="checkbox2">
          Second checkbox
        </label>
      </div>
      <div>
        <input type="checkbox" id="checkbox3" />
        <label htmlFor="checkbox3">
          Third checkbox
        </label>
      </div>
      <div>
        <input type="button" value="Save" />
      </div>
    </form>
  );
};

export default Settings;
