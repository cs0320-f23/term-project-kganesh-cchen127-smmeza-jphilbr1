import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Layer } from 'react-map-gl';

interface ControlPanelProps {
  onChange: (visibilityState: Record<string, string>) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
  const [visibility, setVisibility] = useState({
    boundaries: true,
    protectedSegments: true,
    majorRoads: true,
  });

  useEffect(() => {
    // Convert true/false to "visible"/"none"
    const visibilityState: Record<string, string> = Object.fromEntries(
      Object.entries(visibility).map(([k, v]) => [k, v ? 'visible' : 'none'])
    );
    props.onChange(visibilityState);
  }, [visibility, props]);

  const onVisibilityChange = (name: string, value: boolean) => {
    setVisibility({ ...visibility, [name]: value });
  };

  return (
    <div className="control-panel">
      <h3>Layers</h3>
      <label>
        <input
          type="checkbox"
          checked={visibility['boundaries']}
          onChange={(evt) => onVisibilityChange('boundaries', evt.target.checked)}
        />{' '}
        Boundaries
      </label>
    </div>
  );
};

export default React.memo(ControlPanel);