/**
 * Internal block libraries
 */
const { MediaUpload, InspectorControls , RichText } = wp.blockEditor;
const { Button, TextControl, CheckboxControl } = wp.components;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
export default registerBlockType(
    'navus/z-pattern',
    {
        title: __( 'Z Pattern', 'navus' ),
        description: __( 'Text with image.', 'navus' ),
        category: 'navus-blocks',
        keywords: [
            __( 'z pattern', 'navus' ),
            __( 'text with image', 'navus' ),
            __( 'content', 'navus' ),
        ],
        attributes: {
          imageUrl: {
            type: 'string',
            default: '',
          },
          imageAlt: {
            type: 'string',
            default: '',
          },
          title: {
            type: 'string',
            default: '',
          },
          description: {
            type: 'string',
            default: '',
          },
          reverseItems: {
            type: 'boolean',
            default: false,
          },
          fullWidthImage: {
            type: 'boolean',
            default: false,
          },
        },
        edit: props => {
          const { attributes, setAttributes } = props;
          const { className } = props;
          const { imageUrl, imageAlt, title, description, reverseItems, fullWidthImage } = attributes;
          // Function to handle image selection
          const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageAlt: media.alt,
            });
        };
        const handleReverseCheckbox = (checked) => {
          setAttributes({ reverseItems: checked });
        };
        const handleFullWidthImage = (checked) => {
          setAttributes({ fullWidthImage: checked })
        }
          return (
            <>
              <InspectorControls>
                <div class="p-3">
                  {/* Image Upload in Sidebar */}
                  <CheckboxControl
                    label="Reverse Items"
                    className="mb-2"
                    checked={reverseItems}
                    onChange={handleReverseCheckbox}
                  />
                  <MediaUpload
                      onSelect={onSelectImage} // Handles the image selection
                      value={imageUrl} // The currently selected image URL
                      render={ ( { open } ) => (
                          <Button
                              className="button button-large mb-2"
                              onClick={open}
                          >
                              { !imageUrl ? __( 'Upload Image', 'navus' ) : __( 'Change Image', 'navus' )}
                          </Button>
                      )}
                  />
                   <CheckboxControl
                    label="Full Width Image"
                    className="mb-2"
                    checked={fullWidthImage}
                    onChange={handleFullWidthImage}
                  />
                  {/* Image Alt Text Input */}
                  <TextControl
                    className="mb-2"
                    label={ __( 'Image Alt Text', 'navus' ) }
                    value={ imageAlt }
                    onChange={  val => setAttributes({imageAlt: val}) }
                    placeholder={ __( 'Enter alt text for the image...', 'navus' ) }
                  />
                  {/* Title Input */}
                  <TextControl
                    label={ __( 'Title', 'navus' ) }
                    value={ title }
                    onChange={ val => setAttributes({title: val}) }
                    placeholder={ __( 'Enter the title for the section...', 'navus' ) }
                  />
                  <TextControl
                    label={ __( 'Description', 'navus' ) }
                    value={ description }
                    onChange={  val => setAttributes({description: val}) }
                    placeholder={ __( 'Enter the description for the section...', 'navus' ) }
                  />
                </div>
              </InspectorControls>
              <div className={ className }>
                <div className="container">
                  <div className={`row align-items-center ${reverseItems ? 'reversed' : ''}`}>
                    <div className="col-md-6 col-12 z-pattern-content">
                      {/* Editable Title */}
                      <RichText
                          tagName="h1"
                          placeholder={ __( 'Enter title...', 'bavus' )}
                          value={ title } // Value of the title attribute
                          onChange={(newTitle) => setAttributes({ title: newTitle })} // Updates the title on change
                      />

                      {/* Editable Description */}
                      <RichText
                          tagName="p"
                          placeholder={ __( 'Enter description...', 'bavus' )}
                          value={ description } // Value of the description attribute
                          onChange={(newDescription) => setAttributes({ description: newDescription })} // Updates the description on change
                      />
                    </div>
                    <div className="col-md-6 col-12 position-static">
                      <div className="position-static">
                        {/* Image preview section */}
                        { imageUrl ? (
                            <img src={imageUrl} alt={imageAlt} className={`img-fluid z-pattern-image ${fullWidthImage ? 'full-width' : ''}`} />
                        ) : (
                            <div className="image-placeholder">
                                <img src="https://via.placeholder.com/850x750?text=No%20Media%20Available" className={`img-fluid z-pattern-image ${fullWidthImage ? 'full-width' : ''}`} />
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        },
        save: props => {
          const { attributes } = props;
          const { imageUrl, imageAlt, title, description, reverseItems, fullWidthImage } = attributes;
          return (
            <div className={ attributes.className }>
              <div className="container">
                <div className={`row align-items-center ${reverseItems ? 'reversed' : ''}`}>
                  <div className="col-md-6 col-12 z-pattern-content">
                    {/* Save the title and description with the entered values */}
                    <h1>{ title || __( 'Enter title...', 'text-domain' ) }</h1>
                    <p>{ description || __( 'Enter description...', 'text-domain' ) }</p>
                  </div>
                  <div className="col-md-6 col-12 position-static">
                    <div className="position-static">
                      {/* Save the image with its URL and alt text */}
                      { imageUrl ? (
                          <img src={imageUrl} alt={imageAlt || 'Image description'} className={`img-fluid z-pattern-image ${fullWidthImage ? 'full-width' : ''}`} />
                      ) : (
                          <div className="image-placeholder">
                              <img src="https://via.placeholder.com/850x750?text=No%20Media%20Available" alt="No media available" className={`img-fluid z-pattern-image ${fullWidthImage ? 'full-width' : ''}`} />
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        },
    },
);
