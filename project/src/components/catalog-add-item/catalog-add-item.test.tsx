import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import CatalogAddItem from './catalog-add-item';
import {NameSpace} from '../../const';


const mockStore = configureMockStore();

const mockProducts = [
  {
    id: 2,
    name: 'Ретрокамера Dus Auge lV',
    vendorCode: 'DA4IU67AD5',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
    level: 'Нулевой',
    price: 65000,
    reviewCount: 16,
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp'
  }];

const store = mockStore({
  [NameSpace.Catalog]: {products: mockProducts},
  [NameSpace.Basket]: {basketList: [], candidateForBasketList: 2},
});


const setAddItemPopupState = () => {};//????

describe('Component: CatalogAddItem', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HelmetProvider>
          <CatalogAddItem setAddItemPopupState={setAddItemPopupState}/>
        </HelmetProvider>
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();

  });
});
