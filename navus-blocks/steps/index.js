/**
 * Internal block libraries
 */
const { InspectorControls, RichText } = wp.blockEditor;
const { PanelBody, Button, TextControl, TextareaControl } = wp.components;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const MAX_ITEMS = 6;  // Set the maximum number of items allowed
/**
 * Register block
 */
export default registerBlockType('navus/steps', {
    title: __('Steps', 'navus'),
    description: __('Steps block', 'navus'),
    category: 'navus-blocks',
    keywords: [
      __('steps', 'navus'),
      __('text', 'navus'),
      __('content', 'navus'),
    ],
    supports: {
      spacing: {
        padding: [ 'top', 'bottom' ],    
      },
      color: {
        text: false,
        background: true,
      },
    },
    attributes: {
        sectionTitle: {
            type: 'string',
            default: 'Enter Title'
        },
        stepItems: {
            type: 'array',
            default: [],
        },
        bgClass: {
          type: '',
          default: ''
        }
    },
    edit: (props) => {
      const { attributes, setAttributes } = props;
      const { stepItems, sectionTitle } = attributes;
      const { className } = props;
      
      const addItem = () => {
        if(stepItems.length < MAX_ITEMS){
          const nbewItem = {
            title: '',
            description: '',
          };
          setAttributes({
            stepItems: [...stepItems, nbewItem],
          }); 
        }else{
          alert(__('You can only add a maximum of 6 step items.', 'navus'));
        }
      };
      const removeItem = (index) => {
        const updatedItems = stepItems.filter((_, i) => i !== index);
        setAttributes({ stepItems: updatedItems });
      };
      return (
        <>
          <InspectorControls>
            <PanelBody title={__('Step Settings', 'navus')}>
                <TextControl
                label={__('Section Title', 'navus')}
                value={sectionTitle}
                onChange={(value) => setAttributes({ sectionTitle: value})}
                placeholder={__('Section Title', 'navus')}
                />
              <Button isPrimary onClick={addItem}>
                {__('Add Step Item', 'navus')}
              </Button>
              {stepItems.map((step, index) => (
                <div key={index} className="step-item">
                    <TextareaControl
                    label={__('Title', 'navus')}
                    value={step.title}
                    __nextHasNoMarginBottom="true"
                    onChange={(value) =>{ 
                        const updatedStepItems = [...stepItems];
                        updatedStepItems[index].title = value;
                        setAttributes({stepItems: updatedStepItems})
                    }}
                    placeholder={__('Description', 'navus')}
                    />
                    <TextareaControl
                    label={__('Name', 'navus')}
                    value={step.description}
                    __nextHasNoMarginBottom="true"
                    onChange={(value) => {
                        const updatedStepItems = [...stepItems];
                        updatedStepItems[index].description = value;
                        setAttributes({stepItems: updatedStepItems})
                    }}
                    />
                    <Button isDestructive onClick={() => removeItem(index)}>
                    {__('Remove Step Item', 'navus')}
                    </Button>
                </div>
                ))}
            </PanelBody>
          </InspectorControls>
  
          <div className={`${className}`}>
              <div className="container">
                <RichText
                      tagName="h1"
                      placeholder={ __( 'Enter title...', 'bavus' )}
                      value={ sectionTitle } // Value of the title attribute
                      onChange={(newTitle) => setAttributes({ sectionTitle: newTitle })} // Updates the title on change
                  />
                  <div className="step-counter">
                    { stepItems.map((step, index) => (
                        <div className={`step-counter-item ${index === 0 ? 'active': ''}`} key={index} data-step={index}>
                          <h2>{index + 1}</h2>
                        </div>
                      ))}
                  </div>
                  <div className="step-items col-md-8 col-12">
                    { stepItems.map((step, index) => (
                      <div className={`step-item ${index === 0 ? 'show': ''}`} key={index} data-step={index}>
                          <h3>{step.title}</h3>
                          <p>{step.description}</p>
                      </div>
                    ))}
                  </div>
              </div>
          </div>
        </>
      );
    },
    save: (props) => {
      const { attributes } = props;
      const { stepItems, sectionTitle, margin } = attributes;
      return (
        <div className={`${attributes.className}`}>
            <div className="container">
              <h1>{sectionTitle}</h1>
            <div className="step-counter">
              { stepItems.map((step, index) => (
                  <div className={`step-counter-item ${index === 0 ? 'active': ''}` } key={index} data-step={index}>
                    <h2>{index + 1}</h2>
                  </div>
                ))}
            </div>
            <div className="step-items col-md-8 col-12">
              { stepItems.map((step, index) => (
                <div className={`step-item ${index === 0 ? 'show': ''}`} key={index} data-step={index}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    },
  });