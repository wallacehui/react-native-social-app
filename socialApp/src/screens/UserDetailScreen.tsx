import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { User } from "../models/user";
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Company } from "../models/company";

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
});

export interface RouteProps {
  user: User;
}

type Props = NavigationScreenProps<RouteProps>;

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

export default class UserDetailScreen extends React.PureComponent<Props> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<RouteProps>): NavigationScreenOptions => ({
    headerTitle: (
      <Text style={styles.title}>{navigation.getParam("user").username}</Text>
    ),
  });

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
      <View style={styles.detailContainer}>
        <CompanyInfoRow label="Work At:" value={company.name} />
        <CompanyInfoRow label="Catch Phrase:" value={company.catchPhrase} />
        <CompanyInfoRow label="Business:" value={company.bs} />
      </View>
    );
  }

  render() {
    const user = this.props.navigation.getParam("user");
    return (
      <ScrollView style={styles.rootContainer}>
        {this.renderUserInfo(user)}
        {this.renderCompanyInfo(user.company)}
      </ScrollView>
    );
  }
}
