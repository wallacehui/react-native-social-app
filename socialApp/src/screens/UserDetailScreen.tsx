import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { User } from "../models/user";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";
import { Company } from "../models/company";
import {
  makeTodoListScreenRoute,
  makeAlbumListScreenRoute,
  makeUserPostListScreenRoute,
} from "../routeMaker";
import AddressModal from "../components/AddressModal";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
  },
  detailContainer: {
    flexDirection: "column",
    marginTop: 15,
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 75,
    height: 75,
    alignSelf: "center",
  },
  name: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
    marginVertical: 10,
  },
  infoRow: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
  },
  infoRowLabel: {
    fontSize: 18,
    color: "#333333",
    minWidth: 100,
  },
  infoRowValue: {
    fontSize: 18,
    color: "#333333",
    flex: 1,
    textAlign: "right",
  },
  companyInfoRow: {
    flexDirection: "column",
  },
  companyInfoRowLabel: {
    fontSize: 18,
    color: "#333333",
    flex: 1,
    textAlign: "center",
    marginTop: 5,
  },
  companyInfoRowValue: {
    fontSize: 18,
    color: "#333333",
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    marginVertical: 10,
  },
  companyDetailContainer: {
    flexDirection: "column",
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  separator: {
    backgroundColor: "#E0E0E0",
    height: 1,
    flex: 1,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  navigationLabel: {
    fontSize: 18,
    color: "#333333",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  rightArrow: {
    width: 30,
    height: 30,
  },
  addressButton: {
    backgroundColor: "#4974a2",
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export interface RouteProps {
  user: User;
}

type Props = NavigationScreenProps<RouteProps>;

interface State {
  user: User;
  modalVisible: boolean;
}

function InfoRow(props: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoRowLabel}>{props.label}</Text>
      <Text style={styles.infoRowValue}>{props.value}</Text>
    </View>
  );
}

function CompanyInfoRow(props: { label: string; value: string }) {
  return (
    <View>
      <Text style={styles.companyInfoRowLabel}>{props.label}</Text>
      <Text style={styles.companyInfoRowValue}>{props.value}</Text>
    </View>
  );
}

function NaivgationView(props: { label: string; onPress: () => void }) {
  return (
    <>
      <TouchableOpacity
        style={styles.navigationContainer}
        onPress={props.onPress}
      >
        <Text style={styles.navigationLabel}>{props.label}</Text>
        <Image
          style={styles.rightArrow}
          source={require("../resources/images/navigation_right_arrow.png")}
        />
      </TouchableOpacity>
      <View style={styles.separator} />
    </>
  );
}

export default class UserDetailScreen extends React.PureComponent<
  Props,
  State
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<RouteProps>): NavigationScreenOptions => ({
    headerTitle: (
      <Text style={styles.title}>{navigation.getParam("user").username}</Text>
    ),
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam("user"),
      modalVisible: false,
    };
  }

  renderUserInfo(user: User) {
    return (
      <View style={styles.detailContainer}>
        <Image
          style={styles.profileImage}
          source={require("../resources/images/user_profile_icon.png")}
        />
        <Text style={styles.name}>{user.name}</Text>
        <InfoRow label="Email:" value={user.email} />
        <InfoRow label="Tel:" value={user.phone} />
        <InfoRow label="Website:" value={user.website} />
      </View>
    );
  }

  renderCompanyInfo(company: Company) {
    return (
      <View style={styles.companyDetailContainer}>
        <CompanyInfoRow label="Work At:" value={company.name} />
        <CompanyInfoRow label="Catch Phrase:" value={company.catchPhrase} />
        <CompanyInfoRow label="Business:" value={company.bs} />
      </View>
    );
  }

  onPressPhotoAlbum = () => {
    const [routeName, routeProps] = makeAlbumListScreenRoute({
      user: this.state.user,
    });
    this.props.navigation.navigate({
      routeName,
      params: routeProps,
    });
  };

  onPressTodos = () => {
    const [routeName, routeProps] = makeTodoListScreenRoute({
      user: this.state.user,
    });
    this.props.navigation.navigate({
      routeName,
      params: routeProps,
    });
  };

  onPressPosts = () => {
    const [routeName, routeProps] = makeUserPostListScreenRoute({
      user: this.state.user,
    });
    this.props.navigation.navigate({
      routeName,
      params: routeProps,
    });
  };

  onClose = () => {
    this.setState({ modalVisible: false });
  };

  onShow = () => {
    this.setState({ modalVisible: true });
  };

  render() {
    return (
      <ScrollView style={styles.rootContainer}>
        {this.renderUserInfo(this.state.user)}
        {this.renderCompanyInfo(this.state.user.company)}
        <AddressModal
          address={this.state.user.address}
          onClose={this.onClose}
          visible={this.state.modalVisible}
        />
        <TouchableOpacity style={styles.addressButton} onPress={this.onShow}>
          <Text style={styles.buttonText}>Address</Text>
        </TouchableOpacity>
        <NaivgationView label="Photo Albums" onPress={this.onPressPhotoAlbum} />
        <NaivgationView label="Todos" onPress={this.onPressTodos} />
        <NaivgationView label="Posts" onPress={this.onPressPosts} />
      </ScrollView>
    );
  }
}
