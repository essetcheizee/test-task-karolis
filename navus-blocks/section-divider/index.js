/**
 * Internal block libraries
 */
const { InspectorControls } = wp.blockEditor;
const { SelectControl } = wp.components;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
export default registerBlockType(
    'navus/section-divider',
    {
        title: __( 'Section Divider', 'navus' ),
        description: __( 'Section Separator with custom SVG', 'navus' ),
        category: 'navus-blocks',
        keywords: [
            __( 'spacer', 'navus' ),
            __( 'divider', 'navus' ),
            __( 'separator', 'navus' ),
        ],
        attributes: {
          svgPosition:{
            type: "string",
            default: "right"
          },
          svgType:{
            type: "string",
            default: "option1"
          }
        },
        edit: props => {
          const { attributes, setAttributes } = props;
          const { className } = props
          const { svgPosition, svgType } = attributes;
          let divClass = '';
          switch (svgPosition) {
            case 'left':
              divClass = 'left';
              break;
            case 'middle':
                divClass = 'middle';
            break;
            case 'right':
                divClass = 'right';
            break;
            default:
              break;
          }
          const renderSVG = () => {
                switch (svgType) {
                case 'option1':
                    return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="305" height="168" viewBox="0 0 305 168" fill="none">
                        <rect y="42.588" width="38.844" height="38.844" fill="#ECDD4D"/>
                        <rect x="79.092" y="85.1759" width="38.844" height="38.844" fill="black" fill-opacity="0.9"/>
                        <rect x="126.36" width="110.448" height="38.844" fill="#ECDD4D"/>
                        <rect x="240.552" y="42.588" width="110.448" height="38.844" fill="black" fill-opacity="0.9"/>
                        <rect x="127.764" y="128.7" width="110.448" height="38.844" fill="#ECDD4D"/>
                    </svg>
                    );
                case 'option2':
                    return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="263" height="168" viewBox="0 0 263 168" fill="none">
                        <rect x="271.908" y="82.368" width="38.844" height="38.844" transform="rotate(180 271.908 82.368)" fill="black" fill-opacity="0.9"/>
                        <rect x="224.64" y="167.544" width="110.448" height="38.844" transform="rotate(180 224.64 167.544)" fill="black" fill-opacity="0.9"/>
                        <rect x="110.448" y="124.956" width="110.448" height="38.844" transform="rotate(180 110.448 124.956)" fill="black" fill-opacity="0.9"/>
                        <rect x="223.236" y="38.844" width="110.448" height="38.844" transform="rotate(180 223.236 38.844)" fill="#ECDD4D"/>
                    </svg>
                    );
                case 'option3':
                    return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="237" height="168" viewBox="0 0 237 168" fill="none">
                        <rect width="38.844" height="38.844" transform="matrix(-1 0 0 1 237 42.588)" fill="#ECDD4D"/>
                        <rect width="38.844" height="38.844" transform="matrix(-1 0 0 1 157.908 85.1759)" fill="white"/>
                        <rect width="110.448" height="38.844" transform="matrix(-1 0 0 1 110.64 0)" fill="black" fill-opacity="0.9"/>
                        <rect width="110.448" height="38.844" transform="matrix(-1 0 0 1 109.236 128.7)" fill="#ECDD4D"/>
                    </svg>
                    );
                default:
                    return null;
                }
            };
          return (
            <>
             <InspectorControls>
                <div className="p-3">
                    <SelectControl
                        label="SVG Position"
                        className="mb-2"
                        value={svgPosition}
                        options={[
                        { label: 'Left', value: 'left' },
                        { label: 'Middle', value: 'middle' },
                        { label: 'Right', value: 'right' },
                        ]}
                        onChange={val => setAttributes({ svgPosition: val })}
                    />
                    
                    <SelectControl
                        label="SVG Position"
                        className="mb-2"
                        value={svgType}
                        options={[
                        { label: 'Option 1', value: 'option1' },
                        { label: 'Option 2', value: 'option2' },
                        { label: 'Option 3', value: 'option3' },
                        ]}
                        onChange={val => setAttributes({ svgType: val })}
                    />
                </div>
                </InspectorControls>
              <div className={ className }>
                <div className={divClass}>
                    {renderSVG()}
                </div>
              </div>
            </>
          );
        },
        save: props => {
          const { attributes } = props;
          const { svgPosition, svgType } = attributes;
          let divClass = '';
          switch (svgPosition) {
            case 'left':
              divClass = 'left';
              break;
            case 'middle':
                divClass = 'middle';
            break;
            case 'right':
                divClass = 'right';
            break;
            default:
              break;
          }
          const renderSVG = () => {
            switch (svgType) {
            case 'option1':
                return (
                <svg xmlns="http://www.w3.org/2000/svg" width="305" height="168" viewBox="0 0 305 168" fill="none">
                    <rect y="42.588" width="38.844" height="38.844" fill="#ECDD4D"/>
                    <rect x="79.092" y="85.1759" width="38.844" height="38.844" fill="black" fill-opacity="0.9"/>
                    <rect x="126.36" width="110.448" height="38.844" fill="#ECDD4D"/>
                    <rect x="240.552" y="42.588" width="110.448" height="38.844" fill="black" fill-opacity="0.9"/>
                    <rect x="127.764" y="128.7" width="110.448" height="38.844" fill="#ECDD4D"/>
                </svg>
                );
            case 'option2':
                return (
                <svg xmlns="http://www.w3.org/2000/svg" width="263" height="168" viewBox="0 0 263 168" fill="none">
                    <rect x="271.908" y="82.368" width="38.844" height="38.844" transform="rotate(180 271.908 82.368)" fill="black" fill-opacity="0.9"/>
                    <rect x="224.64" y="167.544" width="110.448" height="38.844" transform="rotate(180 224.64 167.544)" fill="black" fill-opacity="0.9"/>
                    <rect x="110.448" y="124.956" width="110.448" height="38.844" transform="rotate(180 110.448 124.956)" fill="black" fill-opacity="0.9"/>
                    <rect x="223.236" y="38.844" width="110.448" height="38.844" transform="rotate(180 223.236 38.844)" fill="#ECDD4D"/>
                </svg>
                );
            case 'option3':
                return (
                <svg xmlns="http://www.w3.org/2000/svg" width="237" height="168" viewBox="0 0 237 168" fill="none">
                    <rect width="38.844" height="38.844" transform="matrix(-1 0 0 1 237 42.588)" fill="#ECDD4D"/>
                    <rect width="38.844" height="38.844" transform="matrix(-1 0 0 1 157.908 85.1759)" fill="white"/>
                    <rect width="110.448" height="38.844" transform="matrix(-1 0 0 1 110.64 0)" fill="black" fill-opacity="0.9"/>
                    <rect width="110.448" height="38.844" transform="matrix(-1 0 0 1 109.236 128.7)" fill="#ECDD4D"/>
                </svg>
                );
            default:
                return null;
            }
        };
          return (
            <div className={ attributes.className }>
              <div className={divClass}>
                {renderSVG()}
              </div>
            </div>
          );
        },
    },
);
