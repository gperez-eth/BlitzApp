import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TutorialCard } from '../Components'
import Fire from '../database/Fire'

class ExploreCategory extends Component {

  state = {
    tutorialCategory: [],
    user: {},
    loading: true,
    refreshing: false
  }

  constructor(props) {
    super(props)
    this.loadData()
  }

  async loadData() {
    const { route } = this.props
    let category = route.params.title
    var bd = new Fire((error, user) => {
      if (error) {
        return alert("Oh oh, something went wrong" + error)
      } else {
        bd.getCategoryTutorial(category, tutorialCategory => {
          this.setState({tutorialCategory}, () => {
            this.setState({loading: false})
          })
        })
      }
    })
  }

  renderTutoriales = (navigation, tutoriales) => {
    if(tutoriales) {
      return <TutorialCard navigation={navigation} list={tutoriales} />
    }
  }
  
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        {this.state.tutorialCategory.map((item) => {
          return (
            this.renderTutoriales(navigation, item)
          )
        })}
      </View>
    )
  }
}

export default ExploreCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
});
