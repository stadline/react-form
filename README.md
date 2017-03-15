Formulaires avec reactForm
==========================

Le decorator reactForm a été créé pour faciliter la gestion des données d'un formulaire.

⚠ A ne pas confondre avec la lib [redux-form](http://redux-form.com).

Principe
--------

Lorsqu'on manipule des formulaires, il y a souvent 2 types de composants :
 - les composants formulaire, qui contiennent des champs inputs et réagissent aux évènements au niveau HTML (input:change, input:focus, button:click)
 - les conteneurs de données, qui stockes les infos de l'API en vue de la synchroniser au submit du formulaire

Le but du decorator est de faire la passerelle entre ces 2 types de composant, en convertissant les entités en valeurs de formulaire, et vice-versa.

Voici un exemple d'entité

```javascript
const product = Immutable.Map({
  name: "Abonnement 24 mois",
  priceTI: 9950
  description: "Donne l'accès aux clubs pour une durée de 24 mois."
})
```

Et voici un exemple de valeur attendue par le formulaire.

```javascript
const formValues = {
  name: "Abonnement 24 mois",
  priceTI: 99.50
}
```

Pour passer de l'entité au formulaire, on va créer une fonction transform, de telle sorte que
```transform(product) => formValues```. Pour passer du formulaire à l'entité, on va créer l'opération inverse, c'est à
dire une fonction reverseTransform : ```reverseTransform(formValues) => product```.

Dans notre cas :

```javascript
const transform = (product) => ({
  name: product.get('name') || 'nouveau produit', // name prendra la valeur par défaut 'nouveau produit'
  priceTI: product.has('priceTI') ? (product.get('priceTI') / 100) : ''
})

const reverseTransform = (formValues) => Immutable.Map({
  name: formValues.name,
  priceTI: formValues.priceTI ? (formValues.priceTI * 100) : null
})
```

Ainsi notre composant de formulaire n'a pas à ce soucier de la structure de l'entité, il ne regarde qu'une portion de
valeur.

Cette méthode est fortement inspirée de la logique [des formulaires Symfony](http://symfony.com/doc/current/form/data_transformers.html).
Une contraite amenée par cette logique est que le transform et reverseTransform doivent être symétrique. En d'autres
termes : il est interdit de faire une modification qui ne pourrait pas être annulée par l'opération inverse. On ne peut
pas ajouter un préfixe au champ `name` au transform s'il n'est pas retiré au reverseTransform.

Dans l'exemple ci-dessus, la valeur par défaut `nouveau produit` est un parfait exemple de ce qu'il ne faut pas faire !
La valeur par défaut doit être gérée en amont par un composant de plus haut niveau.

Exemple simple
--------------

```javascript
import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import reactForm from 'decorators/reactForm';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ProductForm extends React.Component {
  static propTypes = {
    value: React.PropTypes.object.isRequired,
    modelValue: ImmutablePropTypes.map.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
  }

  render () {
    const { value, onDelete, modelValue } = this.props;

    return (
      <div>
        <h3>Produit</h3>

        <FormGroup>
          <ControlLabel>Nom du produit</ControlLabel>
          <FormControl type='text' name='name' value={value.name} onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Prix TTC</ControlLabel>
          <FormControl type='text' name='priceBaseTI' defaultValue={value.priceBaseTI} onChange={this.handleChange} />
        </FormGroup>

        {!modelValue.get('@id') ? null : (
          <Button bsStyle='danger' onClick={onDelete}>Supprimer l’offre</Button>
        )}
      </div>
    );
  }

  handleChange = (event) => {
    this.props.onChange({
      ...this.props.value,
      [event.target.name]: event.target.value
    });
  }
}

const transform = (product) => ({
  name: product.get('name') || '',
  priceBaseTI: product.get('priceBaseTI') ? (product.get('priceBaseTI') / 100).toFixed(2) : ''
});

const reverseTransform = (viewData) => Immutable.Map({
  name: viewData.name,
  priceBaseTI: viewData.priceBaseTI * 100
});

export default reactForm(transform, reverseTransform)(ProductForm);
```

Réconciliation (merge values)
-----------------------------

A chaque changement, le formulaire va envoyer une représentation tronquée du produit de départ. C'est normal, le
formulaire ne gère pas l'intégralité des champs.

```
Product({ name: "nouveau", priceTI: null, description: "rien" }) --> transform --> Form

Form --> reverseTransform --> Product({ name: "Mon produit", priceTI: 9900 })
```

Dans notre cas, la description est perdue. Pour insérer les valeurs du formulaire dans l'object de départ, il faut
utiliser une fonction merge.

```javascript
handleProductChange (nextProduct) {
  const prevProduct = this.state.product;

  this.setState({
    product: prevProduct.merge(nextProduct)
  })
}
```

De cette façon le produit présent dans le state contient bien les bonnes valeurs.

Exemple simple
--------------

```javascript
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ProductForm from './ProductForm';

class ProductEditor extends React.Component {
  static propTypes = {
    product: ImmutablePropTypes.map.isRequired
  }

  render () {
    const { value } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>{value.product.get('name') || 'Nouveau produit'}</h2>

        <ProductForm value={value.product} onChange={this.handleProductChange} onDelete={this.handleDeleteProduct} />
        <input type='submit' className='btn btn-default' value='Enregistrer' />
      </form>
    );
  }

  componentWillMount () {
    this.setState({
      value: {
        product: this.props.product
      }
    });
  }

  handleProductChange = (nextProduct) => {
    const prevProduct = this.state.value.product;

    this.setState({
      value: {
        ...this.state.value,
        product: prevProduct.merge(nextProduct)
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log('save', this.state.product);
  }

  handleDeleteProduct = () => {
    console.log('delete', this.props.product);
  }
}

export default ProductEditor;
```
