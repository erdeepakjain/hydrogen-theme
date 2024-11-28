import {Link} from '@remix-run/react';
import {VariantSelector} from '@shopify/hydrogen';
import { useCallback, useState } from 'react';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Array<ProductVariantFragment>;
 * }}
 */
export function ProductForm({
  product,
  selectedVariant,
  variants,
  setImageText,
  setImageTextColor,
  setImageTextFontfamily,
}) {
  const { open } = useAside();
  const [inputText, setInputText] = useState();
  const [textColor, setTextColor] = useState('');
  const [textFontFamily, setTextFontFamily] = useState('');

  const changeInputTextHandler = useCallback(
    (e) => {
      setInputText(e.target.value);
      setImageText(e.target.value);
    },
    []
  );

  const ChangeTextColorHandler = useCallback(
    (e) => {
      setTextColor(e.target.value);
      setImageTextColor(e.target.value);
    },
    []
  );

  const ChangeTextFontFamilyHandler = useCallback(
    (e) => {
      setTextFontFamily(e.target.value);
      setImageTextFontfamily(e.target.value);
    },
    []
  );

  console.log('textFontFamily : ', textFontFamily);

  return (
    <div className="product-form">
      <VariantSelector
        handle={product.handle}
        options={product.options.filter((option) => option.optionValues.length > 1)}
        variants={variants}
      >
        {({ option }) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <br />
      {/* Input field for setting the imageText */}
      <label htmlFor="favcolor">Set Text Color:</label>
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        onChange={ChangeTextColorHandler}
        value={textColor}
      />
      <br />
      {/* Input field for setting the imageText */}
      <label htmlFor="imageTextInput">Set Image Text:</label>
      <input
        id="imageTextInput"
        type="text"
        value={inputText} // Controlled input value
        onChange={changeInputTextHandler} // Update the state on change
        placeholder="Enter text for image description"
      />
      <br />
      {/* Input field for setting the imageText */}
      <label htmlFor="fontFamily">Select Font Style:</label>
      <select id="fontFamily" name="fontFamily" onChange={ChangeTextFontFamilyHandler}>
        <option value="">Select Font Style</option>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
      <br />
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          open('cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant,
                  attributes: [
                    { key: 'Text', value: inputText,  },// Use inputText directly as a string
                    { key: 'Text Color', value: textColor, },// Use textColor directly as a string
                    { key: 'Text Style', value: textFontFamily, },// Use textFontFamily directly as a string
                  ],
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}


/**
 * @param {{option: VariantOption}}
 */
function ProductOptions({ option }) {
  return (
    <div className="product-options" key={option.name}>
      <h5>{option.name}</h5>
      <div className="product-options-grid">
        {option.values.map(({ value, isAvailable, isActive, to }) => {
          const isColorOption = option.name.toLowerCase().includes('color');

          return (
            <Link
              className={`product-options-item ${isActive ? 'active' : ''}`}
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '2px solid black' : '1px solid transparent', // Black border if active
                opacity: isAvailable ? 1 : 0.3, // Dim unavailable options
                display: 'inline-block',
                margin: '5px',
                ...(isColorOption && {
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: value, // Swatch color
                  border: isActive ? '3px solid black' : '1px solid #ddd', // Thicker black border when active
                  cursor: isAvailable ? 'pointer' : 'not-allowed',
                }),
              }}
              aria-label={value} // Accessibility label for screen readers
            >
              {/* Show text only if not a color swatch */}
              {!isColorOption && value}
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}


/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
