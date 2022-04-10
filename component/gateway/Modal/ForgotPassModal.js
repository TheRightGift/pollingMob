import React from "react";
import { Modal, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import Core from "../../../Core";
import { connectionStatus, forgotPasswordStatus } from "../../../state/actions";
import store from "../../../state/store";


/**
 * Styles for this component.
 */
const styles = StyleSheet.create({

  /* Style for outer (main) container view. */
  outerContainer : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center",
    margin : 20
  }

}); /* End stylesheet. */


/**
 * NamePromptModal class.
 */
class ForgotPassModal extends React.Component {


  /**
   * Constructor.
   */
  constructor(inProps) {

    super(inProps);

  } /* End constructor. */


  /**
   * Component render().
   */
  render() {

    return (
      <Modal
        presentationStyle={"formSheet"}
        visible={this.props.isVisible}
        animationType={"slide"}
        onRequestClose={ () => { } }>
        <View style={styles.outerContainer}>
          <Text>Forgot Password</Text>
        </View>
      </Modal>
    );

  } /* End render(). */


} /* End class. */


/**
 * Function to map state to Component props.
 */
const mapStateToProps = (inState) => {
  return {
    isVisible : inState.navigationState.forgotPassword,
  };
};


// Export components.
export default connect(mapStateToProps)(ForgotPassModal);
